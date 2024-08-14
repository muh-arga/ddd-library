const BookService = require('../BookService');
const BookRepositoryImpl = require("../../../infra/db/BookRepositoryImpl");

jest.mock("../../../infra/db/BookRepositoryImpl");

describe("BookService", () => {
  let bookService;
  let bookRepository;

  beforeEach(() => {
    bookService = new BookService();
    bookRepository = new BookRepositoryImpl();

    bookService.bookRepository = bookRepository;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("check", () => {
    it("should return all books with available stock", async () => {
      const mockBooks = [
        {
          id: 1,
          code: "JK-45",
          title: "Harry Potter",
          author: "J.K Rowling",
          stock: 1,
          available: true,
        },
        {
          id: 2,
          code: "SHR-1",
          title: "A Study in Scarlet",
          author: "Arthur Conan Doyle",
          stock: 2,
          available: true,
        },
      ];

      bookRepository.findAll.mockResolvedValue(mockBooks);

      const result = await bookService.check();

      expect(result).toEqual([
        {
          code: "JK-45",
          title: "Harry Potter",
          author: "J.K Rowling",
          availableStock: 1,
        },
        {
          code: "SHR-1",
          title: "A Study in Scarlet",
          author: "Arthur Conan Doyle",
          availableStock: 2,
        },
      ]);
      expect(bookRepository.findAll).toHaveBeenCalled();
    });

    it("should return an empty array if no books are found", async () => {
      bookRepository.findAll.mockResolvedValue([]);

      const result = await bookService.check();

      expect(result).toEqual([]);
      expect(bookRepository.findAll).toHaveBeenCalled();
    });
  });
});
