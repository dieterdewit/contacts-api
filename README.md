# contacts-api
Contacts Management API developed with Node.js &amp; TypeScript

## FrontEnd Application

https://github.com/kamiryu-sama/contacts-app

RUN IN THE SAME SERVER BOTH PROGRAMS AS FRONTEND REFERENCES http://localhost:3100/api ROUTES.

## Installation

Clone this repository:

```bash
git clone https://github.com/kamiryu-sama/contacts-api
```

Install Node Packages (Project Dependencies) Node v12.13.0 Recommended

```bash
cd contacts-api
npm install
```

## Database

MySql was used, the database and tables creation are located in */database* directory. You should have a MySql Server.
Remember to create a ***.env*** file for app secrets. 

## Run

### Development:

```bash
npm run dev
```

## Routes

POST http://localhost:3100/api/auth/register
POST http://localhost:3100/api/auth/login

GET http://localhost:3100/api/contacts/:userId
POST http://localhost:3100/api/contacts/:userId
UPDATE http://localhost:3100/api/contacts/:contactId
DELETE http://localhost:3100/api/contacts/:contactId










