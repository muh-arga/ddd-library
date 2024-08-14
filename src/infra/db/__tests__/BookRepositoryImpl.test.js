const BookRepositoryImpl = require("../BookRepositoryImpl");
const prisma = require("../prisma/prismaClient");

jest.mock("../prisma/prismaClient", () => ({
  book: {
    findUnique: jest.fn(),
    upsert: jest.fn(),
    findMany: jest.fn(),
  },
}));

describe("BookRepositoryImpl", () => {
  let bookRepositoryImpl;

  beforeEach(() => {
    bookRepositoryImpl = new BookRepositoryImpl();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findByCode", () => {
    it("should call prisma.book.findUnique", async () => {
      const mockBook = {
        id: 1,
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1,
        available: true,
      };

      prisma.book.findUnique.mockResolvedValue(mockBook);

      const result = await bookRepositoryImpl.findByCode("JK-45");

      expect(prisma.book.findUnique).toHaveBeenCalledWith({
        where: {
          code: "JK-45",
        },
      });
    });
  });

  describe("save", () => {
    it("should call prisma.book.upsert", async () => {
      const mockBook = {
        id: 1,
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1,
        available: true,
      };

      prisma.book.upsert.mockResolvedValue(mockBook);

      const result = await bookRepositoryImpl.save(mockBook);

      expect(prisma.book.upsert).toHaveBeenCalledWith({
        where: { code: mockBook.code },
        update: mockBook,
        create: mockBook,
      });
      expect(result).toEqual(mockBook);
    });
  });

  describe("findAll", () => {
    it("should call prisma.book.findMany", async () => {
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
          code: "TW-11",
          title: "Twilight",
          author: "Stephenie Meyer",
          stock: 2,
          available: true,
        },
      ];

      prisma.book.findMany.mockResolvedValue(mockBooks);

      const result = await bookRepositoryImpl.findAll();

      expect(prisma.book.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockBooks);
    });
  });
});
