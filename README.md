# NextAuth.js - Basic Implementation
This repository contains a basic implementation of **[NextAuth.js](https://next-auth.js.org/)** for authentication in a Next.js application. It provides a simple example of how to integrate NextAuth.js into a Next.js project.

## Overview
This repository serves as a starting point for integrating NextAuth.js into your Next.js application. It demonstrates a basic setup for authentication using NextAuth.js with **credentials provider**. It is intended for learning and reference purposes.

## Features
- Basic implementation of authentication using NextAuth.js.
- Example configuration of **credentials provider** for signing in users.

## Tech Stack
1. **Frontend**
   - **[React](https://react.dev/)** - JavaScript library for building user interfaces with reusable components.
   - **[Next.js](https://nextjs.org/)** - React framework for server-side rendering, static site generation, and API routes.

2. **Backend**
   - **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for creating custom designs quickly.
   - **[Prisma](https://www.prisma.io/)** - ORM (Object-Relational Mapping) for easy database management and queries.
   - **[Zod](https://zod.dev/)** - TypeScript-first schema validation library for defining and validating data structures.
   - **[MySQL](https://www.mysql.com/)** - Relational database management system used for storing and managing data.


## Getting Started
1. **Clone the repository**

   ```bash
    git clone https://github.com/<your-username>/next-auth-basic.git
   ```

2. **Go to the project directory**

   ```bash
    cd next-auth-basic
   ```

3. **Install dependencies**

   ```bash
    npm install
   ```
3. **Install dependencies**

   ```bash
    npm install
   ```

4. **Set up the environment variables**  
Create a `.env` file in the root directory and add the following environment variables (this repository has .env file for example).
   ```env
    NEXTAUTH_URL='http://localhost:3000'
    NEXTAUTH_SECRET='your-secret-key'
    DATABASE_URL="mysql://<username>:<user-password>@localhost:3306/<database-name>"
   ```
5. **Create the MySQL database**  
Before running Prisma migrations, you need to create the database in MySQL where Prisma will set up the schema. Use the following SQL command to create your database:
   ```bash
    CREATE DATABASE <database-name>;
   ```

6. **Run migrations**  
Run Prisma migrations to set up your database schema:
   ```bash
    npx prisma migrate dev
   ```

7. **Run the development server**

   ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
   ```

## Generate Secret Code for NEXTAUTH_SECRET (optional)
If you need a new secret key, you can generate it by accessing the following endpoint and then copy the secret code:
```bash
 GET http://localhost:3000/api/v1/generatesecretcode
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
