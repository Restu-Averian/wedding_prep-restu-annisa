-- Only the item deletion transaction may physically delete financial history.
CREATE TABLE item_deletions (
  item_id TEXT PRIMARY KEY REFERENCES items(id) ON DELETE CASCADE
);

-- No FK: file ownership must survive successful item deletion for cleanup retries.
CREATE TABLE item_file_cleanup (
  key TEXT PRIMARY KEY,
  item_id TEXT NOT NULL
);
CREATE INDEX item_file_cleanup_item ON item_file_cleanup(item_id);

DROP TRIGGER payment_no_delete;
CREATE TRIGGER payment_no_delete BEFORE DELETE ON payments
WHEN NOT EXISTS(SELECT 1 FROM item_deletions WHERE item_id = OLD.item_id)
BEGIN SELECT RAISE(ABORT, 'FINANCIAL_HISTORY'); END;
