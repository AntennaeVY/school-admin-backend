## Run Locally

#### Pre requisites:

- PostgreSQL Installed

Log into `pgsql` and initialize the database

```bash
CREATE DATABASE school-admin;
```

Clone the project

```bash
  git clone https://gitlab.com/a2507/school-admin-backend
```

Go to the project directory

```bash
  cd school-admin-backend
```

Create environment variables file

```bash
touch src/.env
```

Edit the `.env` file with the following variables

```bash
PORT=3000
PGUSER=^YOUR POSTGRES USERNAME^ (default "postgres")
PGPASSWORD=^YOUR POSTGRES PASSWORD^ (default "password")
PGHOST=localhost
PGPORT=5432
PGDATABASE=school-admin
JWT_SECRET=TS2Uukypxof12DzT2eAGB24iIg0=
JWT_EXPIRESIN=4h
```

Install dependencies

```bash
  npm install
```

Start the server in development mode

```bash
  npm run start dev
```

Read the docs at `http://localhost:3000/api/docs`
