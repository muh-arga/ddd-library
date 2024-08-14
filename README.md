# DDD-Library

## **Tech Stack**

- **Node.js**
- **Express**
- **PostgreSQL**
- **Prisma**
- **Jest**

## **Installation**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/muh-arga/ddd-library.git
   cd ddd-library
   ```

2. **Install depedencies**

   ```bash
   yarn install
   ```

3. **Set up the database**

   - Ensure PostgreSQL is running
   - create .env

   ```bash
   cp .env.example .env
   ```

   - configure the database connection on .env

   ```bash
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
   ```

   - Run prisma migration

   ```bash
   npx prisma migrate dev
   ```

   - Seed database

   ```bash
   npx prisma db seed
   ```

4. **Running The Project**
   - Start the server
   ```bash
   yarn start
   ```
   - Running test
   ```bash
       yarn test
   ```

## **Usage**

**API Enpoints:**
_ GET /api/book/check: Check all book and stock.
_ GET /api/member/check: Check all member and number of borrowed books.
_ POST /api/member/borrow: Borrow a book.
_ POST /api/member/return: Return a book.
_ GET /api-docs: Swagger Documentation
