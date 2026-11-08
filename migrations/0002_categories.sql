INSERT INTO categories(id, slug, name, sort_order) VALUES
 ('lamaran','lamaran','Lamaran',1),
 ('seserahan','seserahan','Seserahan',2),
 ('resepsi','resepsi','Resepsi',3),
 ('mahar','mahar','Mahar',4),
 ('akad-nikah','akad-nikah','Akad Nikah',5)
ON CONFLICT(slug) DO NOTHING;
