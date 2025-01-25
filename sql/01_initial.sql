DROP TABLE IF EXISTS t_tasks;
DROP TABLE IF EXISTS t_users;

CREATE TABLE t_users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_on DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE t_columns (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);

CREATE TABLE t_tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT(65535) NOT NULL,
    created_on DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed BOOLEAN NOT NULL,
    created_by BIGINT UNSIGNED NOT NULL,
    column_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (created_by) REFERENCES t_users(id),
    FOREIGN KEY (column_id) REFERENCES t_columns(id)
);

INSERT INTO t_users (name, email) VALUES ('Joshua Ganter', 'mail@joshuaganter.de');
INSERT INTO t_columns (title) VALUES ('TODO'), ('IN PROGRESS'), ('ACCEPTANCE TESTING'), ('DONE');
