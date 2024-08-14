const Book = require("../../domain/book/Book");
const BookRepositoryImpl = require("../../infra/db/BookRepositoryImpl");

class BookService {
  constructor() {
    this.bookRepository = new BookRepositoryImpl();
  }

  async check() {
    const books = await this.bookRepository.findAll();
    return books.map((b) => {
      const book = new Book(b.id, b.code, b.title, b.author, b.stock, b.available);
      return {
        code: book.code,
        title: book.title,
        author: book.author,
        availableStock: book.stock,
      };
    });
  }
}

module.exports = BookService;
