PRAGMA foreign_keys = ON;

CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE TABLE items (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  name TEXT NOT NULL CHECK(length(trim(name)) BETWEEN 1 AND 120),
  estimated_amount INTEGER NOT NULL CHECK(typeof(estimated_amount) = 'integer' AND estimated_amount BETWEEN 0 AND 1000000000000),
  selected_candidate_id TEXT,
  agreed_amount INTEGER CHECK(agreed_amount IS NULL OR (typeof(agreed_amount) = 'integer' AND agreed_amount BETWEEN 0 AND 1000000000000)),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  CHECK((selected_candidate_id IS NULL) = (agreed_amount IS NULL)),
  FOREIGN KEY(id, selected_candidate_id) REFERENCES candidates(item_id, id) ON DELETE RESTRICT
);
CREATE TABLE candidates (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  name TEXT NOT NULL CHECK(length(trim(name)) BETWEEN 1 AND 120),
  url TEXT NOT NULL,
  price INTEGER NOT NULL CHECK(typeof(price) = 'integer' AND price BETWEEN 0 AND 1000000000000),
  note TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  UNIQUE(item_id, id)
);
CREATE TABLE payments (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL REFERENCES items(id) ON DELETE RESTRICT,
  type TEXT NOT NULL CHECK(type IN ('deposit','installment','settlement')),
  amount INTEGER NOT NULL CHECK(typeof(amount) = 'integer' AND amount BETWEEN 1 AND 1000000000000),
  paid_at TEXT NOT NULL CHECK(length(paid_at) = 10 AND date(paid_at, '+0 days') IS NOT NULL AND date(paid_at, '+0 days') = paid_at),
  note TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  voided_at TEXT
);
CREATE INDEX items_category ON items(category_id);
CREATE INDEX payments_item ON payments(item_id, voided_at);

-- ponytail: database triggers serialize financial checks with each write; no application locks.
CREATE TRIGGER selection_history_lock BEFORE UPDATE OF selected_candidate_id, agreed_amount ON items
WHEN (NEW.selected_candidate_id IS NOT OLD.selected_candidate_id OR NEW.agreed_amount IS NOT OLD.agreed_amount)
 AND EXISTS(SELECT 1 FROM payments WHERE item_id = OLD.id)
BEGIN SELECT RAISE(ABORT, 'FINANCIAL_HISTORY'); END;
CREATE TRIGGER selection_price BEFORE UPDATE OF selected_candidate_id, agreed_amount ON items
WHEN NEW.selected_candidate_id IS NOT NULL AND NOT EXISTS(
 SELECT 1 FROM candidates WHERE id = NEW.selected_candidate_id AND item_id = NEW.id AND price = NEW.agreed_amount)
BEGIN SELECT RAISE(ABORT, 'INVALID_SELECTION'); END;
CREATE TRIGGER candidate_price_lock BEFORE UPDATE OF price ON candidates
WHEN NEW.price != OLD.price AND EXISTS(SELECT 1 FROM items WHERE id = OLD.item_id AND selected_candidate_id = OLD.id)
 AND EXISTS(SELECT 1 FROM payments WHERE item_id = OLD.item_id)
BEGIN SELECT RAISE(ABORT, 'FINANCIAL_HISTORY'); END;
CREATE TRIGGER candidate_history_delete BEFORE DELETE ON candidates
WHEN EXISTS(SELECT 1 FROM payments WHERE item_id = OLD.item_id)
BEGIN SELECT RAISE(ABORT, 'FINANCIAL_HISTORY'); END;
CREATE TRIGGER payment_insert BEFORE INSERT ON payments
BEGIN
 SELECT CASE WHEN NOT EXISTS(SELECT 1 FROM items WHERE id = NEW.item_id AND selected_candidate_id IS NOT NULL)
 THEN RAISE(ABORT, 'SELECTION_REQUIRED') END;
 SELECT CASE WHEN NEW.amount + COALESCE((SELECT SUM(amount) FROM payments WHERE item_id = NEW.item_id AND voided_at IS NULL),0)
 > (SELECT agreed_amount FROM items WHERE id = NEW.item_id) THEN RAISE(ABORT, 'OVERPAYMENT') END;
END;
CREATE TRIGGER payment_update BEFORE UPDATE ON payments
BEGIN
 SELECT CASE WHEN OLD.voided_at IS NOT NULL THEN RAISE(ABORT, 'PAYMENT_VOIDED') END;
 SELECT CASE WHEN NEW.item_id != OLD.item_id THEN RAISE(ABORT, 'FINANCIAL_HISTORY') END;
 SELECT CASE WHEN NEW.voided_at IS NULL AND NEW.amount + COALESCE((SELECT SUM(amount) FROM payments WHERE item_id = NEW.item_id AND id != OLD.id AND voided_at IS NULL),0)
 > (SELECT agreed_amount FROM items WHERE id = NEW.item_id) THEN RAISE(ABORT, 'OVERPAYMENT') END;
END;
CREATE TRIGGER payment_no_delete BEFORE DELETE ON payments
BEGIN SELECT RAISE(ABORT, 'FINANCIAL_HISTORY'); END;

CREATE VIEW item_finances AS
 SELECT i.*, c.slug AS category_slug, c.name AS category_name,
 COALESCE(i.agreed_amount, i.estimated_amount) AS effective_amount,
 COALESCE((SELECT SUM(p.amount) FROM payments p WHERE p.item_id = i.id AND p.voided_at IS NULL),0) AS paid_amount
 FROM items i JOIN categories c ON c.id = i.category_id;
