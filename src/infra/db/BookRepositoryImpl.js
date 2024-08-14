const prisma = require("./prisma/prismaClient");
const BookRepository = require("../../domain/book/BookRepository");

class BookRepositoryImpl extends BookRepository {
  async findByCode(code) {
    return await prisma.book.findUnique({
      where: { code },
    });
  }

  async save(book) {
    return await prisma.book.upsert({
      where: { code: book.code },
      update: book,
      create: book,
    });
  }

  async findAll() {
    return await prisma.book.findMany();
  }
}

module.exports = BookRepositoryImpl;
