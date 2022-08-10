# Golden Eye

Golden Eye is an app to track your day to day transactions.

Project made during the [Airbank challenge](https://github.com/joinairbank/challenges/tree/main/dev-fullstack).

## About the folder structure

Each folder represent a subject of the app.

## How to run the project locally

> Back-end

Inside of the back-end folder create a `.env` file and put the following variables:

```
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
PORT=PORT_NUMBER
```

<details>
<summary>About the variables</summary>

* USER: The name of your database user
* PASSWORD: The password for your database user
* PORT: The port where your database server is running (typically 3306 for MySQL)
* DATABASE: The name of the database
* PORT_NUMBER: The port number of your API (if you don't provide any value, the default value will be 3000)
</details>

Install the dependencies and run these commands:

```
npx prisma db push
npx prisma db seed
npm run start
```

> Front-end

Inside of the front-end folder create a `.env.local` file and put the following variables:

```
VITE_API_URL=API_URL
```

<details>
<summary>About the variables</summary>

* API_URL: The URL to the back-end API
</details>
