-- CREATE settings TABLE
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT 'no'
);

-- INSERT default settings
INSERT INTO settings (key, value) VALUES
  ('autotyping', 'no'),
  ('autorecord', 'no'),
  ('autorect', 'no'),
  ('alwaysonline', 'no'),
  ('autorecordtyping', 'no')
ON CONFLICT (key) DO NOTHING;
