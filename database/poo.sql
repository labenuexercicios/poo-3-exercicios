-- Active: 1683149070038@@127.0.0.1@3306
CREATE TABLE Hero (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    vida REAL DEFAULT (0) NOT NULL,
    forca REAL DEFAULT (0) NOT NULL, 
    name TEXT NOT NULL
);

INSERT INTO Hero (id, vida, forca, name)
VALUES
("x01", "35.000", "575", "Tao pai pai");

SELECT * FROM Hero;

