## Intro

Welcome to SimpleNotes, a clone of Evernote with CRUD operations to keep track of all your notes.

## Live Site

https://simplenotes.herokuapp.com/

## Features

https://github.com/Felmallakh/Simplenote/wiki/feature-list

## Database Schema

https://github.com/Felmallakh/Simplenote/wiki/database-schema

## Setting Up Local Use

1. Clone the repo from GitHub at `https://github.com/Felmallakh/Simplenote`

2. Run NPM install in the frontend and backend directories to install all dependencies.

3. Create a .env, and copy the .env.example file into it.

4. Create a user in Postgres with the username and password set in your .env file, with CREATEDB.

5. Create the database by running the command: `npx dotenv sequelize db:create`

6. Migrate the database by running the command: `npx dotenv sequelize db:migrate`

7. Seed the database by running the command: `npx dotenv sequelize db:seed:all`

8. Open a second terminal. In one, go into the backend directory and run npm start. In the other, go into the frontend directory and run npm start. This should start up both servers and open the app in your browser.
