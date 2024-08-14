const Book = require("../Book");

describe("Book Domain", () => {
  let book;

  beforeEach(() => {
    book = new Book(1, "JK-45", "Harry Potter", "J.K. Rowling", 1);
  });

  it("should return true when the book is available", () => {
    expect(book.isAvailable()).toBe(true);
  });

  it("should return false when the book is not available", () => {
    book.stock = 0;
    expect(book.isAvailable()).toBe(false);
  });

  it("should reduce stock and set available to false if stock becomes 0 after borrow", () => {
    book.borrow();

    expect(book.stock).toBe(0);
    expect(book.available).toBe(false);
  });

  it("should not change availability if stock is above 0 after borrowing", () => {
    book.stock = 2;

    book.borrow();

    expect(book.stock).toBe(1);
    expect(book.available).toBe(true);
  });

  it("should throw an error if borrow a book that is not available", () => {
    book.stock = 0;
    book.available = false;
    expect(() => book.borrow()).toThrow("Book is not available");
  });

  it("should increase stock and set available to true on return", () => {
    book.stock = 0;
    book.return();
    expect(book.stock).toBe(1);
    expect(book.available).toBe(true);
  });
});
