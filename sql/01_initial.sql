DROP TABLE IF EXISTS t_tasks;

CREATE TABLE t_tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT(65535),
    created_on DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_on DATETIME,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_by VARCHAR(255),
    assignee VARCHAR(255),
    column_id INT UNSIGNED NOT NULL,
    column_order FLOAT(25) NOT NULL DEFAULT 0
);

INSERT INTO t_tasks (title, description, created_by, assignee, column_id) VALUES
("Portfolio erstellen", "Ein Portfolio erstellen, das meine Fähigkeiten darstellt.", "Joshua", "Joshua", 1),
("Wäsche waschen", "", "Joshua", "Joshua", 0),
("Einkaufen", "3x Bananen, 1x Haferflocken, 1l Mandelmilch", "Joshua", "Joshua", 3),
("Go lernen", "https://gowebexamples.com/", "Joshua", "Joshua", 0),
("Training", "", "FitBot", "Joshua", 3),
("Buch kaufen", "", "Joshua", "Joshua", 3),
("Steuererklärung", "", "Joshua", "Steuerberatung", 2);
