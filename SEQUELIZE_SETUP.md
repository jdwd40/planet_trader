# Sequelize Database Setup Instructions

This document provides instructions for setting up and managing your development and test PostgreSQL databases with Sequelize.

## Prerequisites

Ensure you have the following packages installed:

```bash
npm install --save sequelize pg pg-hstore uuid sequelize-cli
```

## Setup Steps

1. **Create Environment Files**

   Make a copy of the `.env.example` file for development:

   ```bash
   cp .env.example .env.development
   ```

   And another copy for testing:

   ```bash
   cp .env.example .env.test
   ```

   Edit these files to set your database credentials.

2. **Create the Databases**

   First, make sure PostgreSQL is running, then create the development and test databases:

   ```bash
   # Connect to PostgreSQL
   psql -U postgres

   # Within the PostgreSQL prompt, create the databases
   CREATE DATABASE sorstar_dev;
   CREATE DATABASE sorstar_test;
   
   # Exit PostgreSQL
   \q
   ```

3. **Run Migrations**

   Create the tables in the development database:

   ```bash
   # For development environment
   NODE_ENV=development npx sequelize-cli db:migrate
   ```

   Create the tables in the test database:

   ```bash
   # For test environment
   NODE_ENV=test npx sequelize-cli db:migrate
   ```

4. **Run Seeders**

   Populate the development database with seed data:

   ```bash
   # For development environment
   NODE_ENV=development npx sequelize-cli db:seed:all
   ```

   If you want to seed the test database as well:

   ```bash
   # For test environment
   NODE_ENV=test npx sequelize-cli db:seed:all
   ```

## Helpful Commands

- **Create a New Model**
  ```bash
  npx sequelize-cli model:generate --name ModelName --attributes field1:string,field2:integer
  ```

- **Create a New Migration**
  ```bash
  npx sequelize-cli migration:generate --name migration-name
  ```

- **Create a New Seeder**
  ```bash
  npx sequelize-cli seed:generate --name seeder-name
  ```

- **Undo Migrations**
  ```bash
  NODE_ENV=development npx sequelize-cli db:migrate:undo:all
  NODE_ENV=test npx sequelize-cli db:migrate:undo:all
  ```

- **Undo Seeders**
  ```bash
  NODE_ENV=development npx sequelize-cli db:seed:undo:all
  NODE_ENV=test npx sequelize-cli db:seed:undo:all
  ```

## Integration with Express

The database connection is now managed through the Sequelize ORM as configured in `models/index.js`. This file automatically selects the correct database configuration based on the NODE_ENV environment variable. Import it in your Express app like this:

```javascript
const db = require('./models');

// Sync database on startup (optional)
db.sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });
```

Remember to update your endpoints to use Sequelize models instead of direct database queries.
