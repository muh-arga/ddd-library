const Member = require("../Member");
const Book = require("../../book/Book");

describe("Member Domain", () => {
  let member;
  let borrowedBookRepository;

  beforeEach(() => {
    borrowedBookRepository = {
      create: jest.fn(),
      findByMemberAndBook: jest.fn(),
      update: jest.fn(),
    };

    member = new Member(1, "MEM-1", "John Doe", []);
  });

  it("should allow member borrow book if condition met", async () => {
    const mockBook = {
      id: 1,
      code: "JK-45",
      title: "Harry Potter",
      author: "J.K Rowling",
      stock: 1,
      available: true,
    };

    const book = new Book(
      mockBook.id,
      mockBook.code,
      mockBook.title,
      mockBook.author,
      mockBook.stock,
      mockBook.available
    );

    jest.spyOn(book, "isAvailable").mockReturnValue(true);

    await member.borrowBook(book, borrowedBookRepository);

    expect(borrowedBookRepository.create).toHaveBeenCalledWith({
      bookCode: mockBook.code,
      memberCode: member.code,
    });
    expect(member.canBorrow()).toBe(true);
  });

  it("should throw an error if the book is not available", async () => {
    const mockBook = {
      id: 1,
      code: "JK-45",
      title: "Harry Potter",
      author: "J.K Rowling",
      stock: 0,
      available: false,
    };

    const book = new Book(
      mockBook.id,
      mockBook.code,
      mockBook.title,
      mockBook.author,
      mockBook.stock,
      mockBook.available
    );

    jest.spyOn(book, "isAvailable").mockReturnValue(false);

    await expect(
      member.borrowBook(book, borrowedBookRepository)
    ).rejects.toThrow("Book is not available");
  });

  it("should throw error if member already borrow 2 books", async () => {
    member.borrowedBooks = [
      {
        id: 1,
        bookCode: "JK-45",
        memberCode: "M001",
        borrowedAt: new Date(),
        returnedAt: null,
        penalty: 0,
      },
      {
        id: 2,
        bookCode: "JK-46",
        memberCode: "M001",
        borrowedAt: new Date(),
        returnedAt: null,
        penalty: 0,
      },
    ];

    const mockBook = {
      id: 3,
      code: "JK-47",
      title: "Harry Potter",
      author: "J.K Rowling",
      stock: 1,
      available: true,
    };

    await expect(
      member.borrowBook(mockBook, borrowedBookRepository)
    ).rejects.toThrow("Member cannot borrow book");
  });

  it("should give penalty if member return book after 7 days", async () => {
    const mockBook = {
      id: 1,
      code: "JK-45",
      title: "Harry Potter",
      author: "J.K Rowling",
      stock: 0,
      available: false,
    };

    const borrowedAt = new Date();
    borrowedAt.setDate(borrowedAt.getDate() - 10);

    borrowedBookRepository.findByMemberAndBook.mockResolvedValue({
      id: 1,
      bookCode: mockBook.code,
      memberCode: member.code,
      borrowedAt,
      returnedAt: null,
      penalty: 0,
    });

    await member.returnBook(mockBook, borrowedBookRepository);

    expect(member.penaltyUntil).not.toBeNull();
    expect(borrowedBookRepository.update).toHaveBeenCalledWith({
      id: 1,
      returnedAt: expect.any(Date),
      penalty: 1,
    });
  });

  it("should not allow member to return book if book not borrowed by member", async () => {
    const mockBook = {
      id: 1,
      code: "JK-45",
      title: "Harry Potter",
      author: "J.K Rowling",
      stock: 0,
      available: false,
    };

    borrowedBookRepository.findByMemberAndBook.mockResolvedValue(null);

    await expect(
      member.returnBook(mockBook, borrowedBookRepository)
    ).rejects.toThrow("This book not borrowed by this member");
  });
});
