const MemberService = require("../MemberService");
const BookRepositoryImpl = require("../../../infra/db/BookRepositoryImpl");
const MemberRepositoryImpl = require("../../../infra/db/MemberRepositoryImpl");
const BorrowedBookRepositoryImpl = require("../../../infra/db/BorrowedBookRepositoryImpl");

jest.mock("../../../infra/db/BookRepositoryImpl");
jest.mock("../../../infra/db/MemberRepositoryImpl");
jest.mock("../../../infra/db/BorrowedBookRepositoryImpl");

describe("MemberService", () => {
  let memberService;
  let memberRepository;
  let bookRepository;
  let borrowedBookRepository;

  beforeEach(() => {
    memberRepository = new MemberRepositoryImpl();
    bookRepository = new BookRepositoryImpl();
    borrowedBookRepository = new BorrowedBookRepositoryImpl();
    memberService = new MemberService();

    memberService.bookRepository = bookRepository;
    memberService.memberRepository = memberRepository;
    memberService.borrowedBookRepository = borrowedBookRepository;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("borrowBook", () => {
    it("member can borrow books if condition are met", async () => {
      const mockMemberData = {
        id: 1,
        code: "M001",
        name: "Angga",
        borrowedBooks: [],
        penaltyUntil: null,
      };
      const mockBookData = {
        id: 1,
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1,
        available: true,
      };

      memberRepository.findByCode.mockResolvedValue(mockMemberData);
      bookRepository.findByCode.mockResolvedValue(mockBookData);
      borrowedBookRepository.create.mockResolvedValue();

      await memberService.borrowBook(mockBookData.code, mockMemberData.code);

      expect(memberRepository.save).toHaveBeenCalled();
      expect(bookRepository.save).toHaveBeenCalled();
      expect(borrowedBookRepository.create).toHaveBeenCalled();
    });

    it("throw error if member not found", async () => {
      memberRepository.findByCode.mockResolvedValue(null);

      await expect(memberService.borrowBook("JK-45", "M001")).rejects.toThrow(
        "Member not found"
      );
    });

    it("throw error if book not found", async () => {
      const mockMemberData = {
        id: 1,
        code: "M001",
        name: "Angga",
        borrowedBooks: [],
        penaltyUntil: null,
      };

      memberRepository.findByCode.mockResolvedValue(mockMemberData);
      bookRepository.findByCode.mockResolvedValue(null);

      await expect(memberService.borrowBook("JK-45", "M001")).rejects.toThrow(
        "Book not found"
      );
    });

    it("member can't borrow more than 2 books", async () => {
      const mockMemberData = {
        id: 1,
        code: "M001",
        name: "Angga",
        borrowedBooks: [
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
        ],
        penaltyUntil: null,
      };
      const mockBookData = [
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
          code: "JK-46",
          title: "Harry Potter 2",
          author: "J.K Rowling",
          stock: 1,
          available: true,
        },
        {
          id: 3,
          code: "JK-47",
          title: "Harry Potter 3",
          author: "J.K Rowling",
          stock: 1,
          available: true,
        },
      ];

      memberRepository.findByCode.mockResolvedValue(mockMemberData);
      bookRepository.findByCode.mockResolvedValue(mockBookData[2]);

      await expect(memberService.borrowBook("JK-47", "M001")).rejects.toThrow(
        "Member cannot borrow book"
      );

      expect(memberRepository.save).not.toHaveBeenCalled();
      expect(bookRepository.save).not.toHaveBeenCalled();
      expect(borrowedBookRepository.create).not.toHaveBeenCalled();
    });

    it("member can't borrow book if book is not available", async () => {
      const mockMemberData = {
        id: 1,
        code: "M001",
        name: "Angga",
        borrowedBooks: [],
        penaltyUntil: null,
      };
      const mockBookData = {
        id: 1,
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 0,
        available: false,
      };

      memberRepository.findByCode.mockResolvedValue(mockMemberData);
      bookRepository.findByCode.mockResolvedValue(mockBookData);

      await expect(memberService.borrowBook("JK-45", "M001")).rejects.toThrow(
        "Book is not available"
      );

      expect(memberRepository.save).not.toHaveBeenCalled();
      expect(bookRepository.save).not.toHaveBeenCalled();
      expect(borrowedBookRepository.create).not.toHaveBeenCalled();
    });

    it("member can't borrow book if member has penalty", async () => {
      const mockMemberData = {
        id: 1,
        code: "M001",
        name: "Angga",
        borrowedBooks: [],
        penaltyUntil: new Date(new Date().setDate(new Date().getDate() + 1)),
      };
      const mockBookData = {
        id: 1,
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1,
        available: true,
      };

      memberRepository.findByCode.mockResolvedValue(mockMemberData);
      bookRepository.findByCode.mockResolvedValue(mockBookData);

      await expect(memberService.borrowBook("JK-45", "M001")).rejects.toThrow(
        "Member cannot borrow book"
      );

      expect(memberRepository.save).not.toHaveBeenCalled();
      expect(bookRepository.save).not.toHaveBeenCalled();
      expect(borrowedBookRepository.create).not.toHaveBeenCalled();
    });
  });

  describe("returnBook", () => {
    it("member can return books if condition are met", async () => {
      const mockMemberData = {
        id: 1,
        code: "M001",
        name: "Angga",
        borrowedBooks: [
          {
            id: 1,
            bookCode: "JK-45",
            memberCode: "M001",
            borrowedAt: new Date(),
            returnedAt: null,
            penalty: 0,
          },
        ],
        penaltyUntil: null,
      };
      const mockBookData = {
        id: 1,
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1,
        available: false,
      };

      memberRepository.findByCode.mockResolvedValue(mockMemberData);
      bookRepository.findByCode.mockResolvedValue(mockBookData);
      borrowedBookRepository.findByMemberAndBook.mockResolvedValue({
        id: 1,
        bookCode: "JK-45",
        memberCode: "M001",
        borrowedAt: new Date(),
        returnedAt: null,
        penalty: 0,
      });

      await memberService.returnBook(mockBookData.code, mockMemberData.code);

      expect(memberRepository.save).toHaveBeenCalled();
      expect(bookRepository.save).toHaveBeenCalled();
      expect(borrowedBookRepository.update).toHaveBeenCalled();
    });

    it("throw error if member not found", async () => {
      memberRepository.findByCode.mockResolvedValue(null);

      await expect(memberService.returnBook("JK-45", "M001")).rejects.toThrow(
        "Member not found"
      );
    });

    it("throw error if book not found", async () => {
      const mockMemberData = {
        id: 1,
        code: "M001",
        name: "Angga",
        borrowedBooks: ["JK-45"],
        penaltyUntil: null,
      };

      memberRepository.findByCode.mockResolvedValue(mockMemberData);
      bookRepository.findByCode.mockResolvedValue(null);

      await expect(memberService.returnBook("JK-45", "M001")).rejects.toThrow(
        "Book not found"
      );
    });

    it("throw error if book not borrowed by member", async () => {
      const mockMemberData = {
        id: 1,
        code: "M001",
        name: "Angga",
        borrowedBooks: [],
        penaltyUntil: null,
      };
      const mockBookData = {
        id: 1,
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 0,
        available: false,
      };

      memberRepository.findByCode.mockResolvedValue(mockMemberData);
      bookRepository.findByCode.mockResolvedValue(mockBookData);
      borrowedBookRepository.findByMemberAndBook.mockResolvedValue(null);

      await expect(memberService.returnBook("JK-45", "M001")).rejects.toThrow(
        "This book not borrowed by this member"
      );
    });

    it("member get penalty if return book more than 7 days", async () => {
      const mockMemberData = {
        id: 1,
        code: "M001",
        name: "Angga",
        borrowedBooks: [
          {
            id: 1,
            bookCode: "JK-45",
            memberCode: "M001",
            borrowedAt: new Date(new Date().setDate(new Date().getDate() - 8)),
            returnedAt: null,
            penalty: 0,
          },
        ],
        penaltyUntil: null,
      };
      const mockBookData = {
        id: 1,
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1,
        available: false,
      };

      memberRepository.findByCode.mockResolvedValue(mockMemberData);
      bookRepository.findByCode.mockResolvedValue(mockBookData);
      borrowedBookRepository.findByMemberAndBook.mockResolvedValue({
        id: 1,
        bookCode: "JK-45",
        memberCode: "M001",
        borrowedAt: new Date(new Date().setDate(new Date().getDate() - 8)),
        returnedAt: null,
        penalty: 0,
      });

      await memberService.returnBook("JK-45", "M001");

      expect(memberRepository.save).toHaveBeenCalled();
      expect(bookRepository.save).toHaveBeenCalled();
      expect(borrowedBookRepository.update).toHaveBeenCalled();
      expect(memberRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          penaltyUntil: expect.any(Date),
        })
      );
    });
  });

  describe("check", () => {
    it("should return a list of members with borrowed books count", async () => {
      const mockMembers = [
        {
          id: 1,
          code: "M001",
          name: "Angga",
          borrowedBooks: ["JK-45"],
          penaltyUntil: null,
        },
        {
          id: 2,
          code: "M002",
          name: "Ferry",
          borrowedBooks: [],
          penaltyUntil: null,
        },
      ];

      memberRepository.findAll.mockResolvedValue(mockMembers);

      const result = await memberService.check();

      expect(result).toEqual([
        { code: "M001", name: "Angga", penaltyUntil: null, borrowedBooks: 1 },
        { code: "M002", name: "Ferry", penaltyUntil: null, borrowedBooks: 0 },
      ]);
    });
  });
});
