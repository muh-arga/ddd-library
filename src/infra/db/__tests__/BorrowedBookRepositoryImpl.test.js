const BorrowedBookRepositoryImpl = require("../BorrowedBookRepositoryImpl");
const prisma = require("../prisma/prismaClient");

jest.mock("../prisma/prismaClient", () => ({
  borrowedBook: {
    create: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
}));

describe("BorrowedBookRepositoryImpl", () => {
  let borrowedBookRepositoryImpl;

  beforeEach(() => {
    borrowedBookRepositoryImpl = new BorrowedBookRepositoryImpl();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should call prisma.borrowedBook.create", async () => {
      const mockBorrowedBook = {
        id: 1,
        memberCode: "M001",
        bookCode: "HP-01",
        borrowedAt: new Date(),
        returnedAt: null,
      };

      prisma.borrowedBook.create.mockResolvedValue(mockBorrowedBook);

      const result = await borrowedBookRepositoryImpl.create(mockBorrowedBook);

      expect(prisma.borrowedBook.create).toHaveBeenCalledWith({
        data: mockBorrowedBook,
      });
      expect(result).toEqual(mockBorrowedBook);
    });
  });

  describe("findByMember", () => {
    it("should call prisma.borrowedBook.findMany", async () => {
      const mockBorrowedBooks = [
        {
          id: 1,
          memberCode: "M001",
          bookCode: "HP-01",
          borrowedAt: new Date(),
          returnedAt: null,
        },
        {
          id: 2,
          memberCode: "M001",
          bookCode: "HP-02",
          borrowedAt: new Date(),
          returnedAt: null,
        },
      ];

      prisma.borrowedBook.findMany.mockResolvedValue(mockBorrowedBooks);

      const result = await borrowedBookRepositoryImpl.findByMember("M001");

      expect(prisma.borrowedBook.findMany).toHaveBeenCalledWith({
        where: { memberCode: "M001" },
      });
      expect(result).toEqual(mockBorrowedBooks);
    });
  });

  describe("findByMemberAndBook", () => {
    it("should call prisma.borrowedBook.findFirst", async () => {
      const mockBorrowedBook = {
        id: 1,
        memberCode: "M001",
        bookCode: "HP-01",
        borrowedAt: new Date(),
        returnedAt: null,
      };

      prisma.borrowedBook.findFirst.mockResolvedValue(mockBorrowedBook);

      const result = await borrowedBookRepositoryImpl.findByMemberAndBook(
        "M001",
        "HP-01"
      );

      expect(prisma.borrowedBook.findFirst).toHaveBeenCalledWith({
        where: { memberCode: "M001", bookCode: "HP-01", returnedAt: null },
      });
      expect(result).toEqual(mockBorrowedBook);
    });
  });

  describe("update", () => {
    it("should call prisma.borrowedBook.update", async () => {
      const mockBorrowedBook = {
        id: 1,
        memberCode: "M001",
        bookCode: "HP-01",
        borrowedAt: new Date(),
        returnedAt: null,
      };

      prisma.borrowedBook.update.mockResolvedValue(mockBorrowedBook);

      const result = await borrowedBookRepositoryImpl.update(mockBorrowedBook);

      expect(prisma.borrowedBook.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: mockBorrowedBook,
      });
      expect(result).toEqual(mockBorrowedBook);
    });
  });
});
