CREATE TABLE "responses"(
    id INTEGER NOT NULL,
    poll_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    option_id INTEGER NOT NULL
);
ALTER TABLE
    "responses" ADD PRIMARY KEY("id");
CREATE TABLE "users"(
    id INTEGER NOT NULL,
    user_name VARCHAR(80) NOT NULL,
    password_hash VARCHAR(80) NOT NULL,
    email VARCHAR(255) NOT NULL,
    is_online BOOLEAN NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_user_name_unique" UNIQUE("user_name");
CREATE TABLE "polls"(
    "id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "is_private" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL
);
ALTER TABLE
    "polls" ADD PRIMARY KEY("id");
CREATE TABLE "options"(
    id INTEGER NOT NULL,
    option VARCHAR(255) NOT NULL,
    poll_id INTEGER NOT NULL
);
ALTER TABLE
    "options" ADD PRIMARY KEY("id");
CREATE TABLE "participants"(
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "poll_id" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL
);
ALTER TABLE
    "participants" ADD PRIMARY KEY("id");
ALTER TABLE
    "options" ADD CONSTRAINT "options_poll_id_foreign" FOREIGN KEY("poll_id") REFERENCES "polls"("id");
ALTER TABLE
    "responses" ADD CONSTRAINT "responses_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "responses" ADD CONSTRAINT "responses_option_id_foreign" FOREIGN KEY("option_id") REFERENCES "options"("id");
ALTER TABLE
    "responses" ADD CONSTRAINT "responses_poll_id_foreign" FOREIGN KEY("poll_id") REFERENCES "polls"("id");
ALTER TABLE
    "participants" ADD CONSTRAINT "participants_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "polls" ADD CONSTRAINT "polls_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "participants" ADD CONSTRAINT "participants_poll_id_foreign" FOREIGN KEY("poll_id") REFERENCES "polls"("id");
