# Filling database with initial data

For both modes (dev and prod) you have to fill database with initial data.
If database is _empty_ then after launching database you have to follow instructions in the `database/seed/README.md` file to fill database with quotes and categories.

All necessary database files are located in the `database/data`.

---

# Running API service in DEVELOPMENT mode

## Run docker containers for the PostgreSQL and Adminer

1. Change directory to the `server` folder
1. Run DB containers using `docker compose up -d`

## Install NPM dependencies

1. Change directory to the `server` folder
1. Install necessary NPM dependencies `npm install`

## Run Node.js application in development mode

1. Change directory to the `server` folder
1. Run Node.js application using NPM script `npm run dev`

## Stop application

1. Stop Node.js application using `Ctrl + C` in the terminal
1. Stop DB containers using `docker compose down`

---

# Running API service in PRODUCTION mode

## Run PostgreSQL database somewhere in production

1. Copy database credentials for the next step

## Add environment variables

1. Create `.env` file in the `server` foler
1. Fill environment variables based on the `.env.sample` file

## Install NPM dependencies

1. Change directory to the `server` folder
1. Install necessary NPM dependencies `npm install`

## Run Node.js application in production mode

1. Change directory to the `server` folder
1. Run Node.js application using NPM script `npm start`
