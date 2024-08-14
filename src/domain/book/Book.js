class Book {
  constructor(id, code, title, author, stock, available = true) {
    this.id = id;
    this.code = code;
    this.title = title;
    this.author = author;
    this.stock = stock;
    this.available = available;
  }

  isAvailable() {
    return this.available && this.stock > 0;
  }

  borrow() {
    if (!this.isAvailable()) {
      throw new Error("Book is not available");
    }

    this.stock -= 1;
    if (this.stock === 0) {
      this.available = false;
    }
  }

  return() {
    this.stock += 1;
    this.available = true;
  }
}

module.exports = Book;
