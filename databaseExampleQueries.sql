CREATE TABLE "polls"(
    id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    is_private BOOLEAN NOT NULL,
    user_id INTEGER NOT NULL
);


INSERT INTO polls
 (title, description, is_private)
VALUES
