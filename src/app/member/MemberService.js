const Book = require("../../domain/book/Book");
const Member = require("../../domain/member/Member");
const BookRepositoryImpl = require("../../infra/db/BookRepositoryImpl");
const BorrowedBookRepositoryImpl = require("../../infra/db/BorrowedBookRepositoryImpl");
const MemberRepositoryImpl = require("../../infra/db/MemberRepositoryImpl");

class MemberService {
  constructor() {
    this.bookRepository = new BookRepositoryImpl();
    this.memberRepository = new MemberRepositoryImpl();
    this.borrowedBookRepository = new BorrowedBookRepositoryImpl();
  }

  async borrowBook(bookCode, memberCode) {
    const memberData = await this.memberRepository.findByCode(memberCode);
    if (!memberData) {
      throw new Error("Member not found");
    }

    const bookData = await this.bookRepository.findByCode(bookCode);
    if (!bookData) {
      throw new Error("Book not found");
    }

    const member = new Member(
      memberData.id,
      memberData.code,
      memberData.name,
      memberData.borrowedBooks,
      memberData.penaltyUntil
    );
    const book = new Book(
      bookData.id,
      bookData.code,
      bookData.title,
      bookData.author,
      bookData.stock,
      bookData.available
    );

    await member.borrowBook(book, this.borrowedBookRepository);
    book.borrow();

    await this.memberRepository.save(member);
    await this.bookRepository.save(book);
  }

  async returnBook(bookCode, memberCode, returnDate = new Date()) {
    const memberData = await this.memberRepository.findByCode(memberCode);
    if (!memberData) {
      throw new Error("Member not found");
    }

    const bookData = await this.bookRepository.findByCode(bookCode);
    if (!bookData) {
      throw new Error("Book not found");
    }

    const member = new Member(
      memberData.id,
      memberData.code,
      memberData.name,
      memberData.borrowedBooks,
      memberData.penaltyUntil
    );
    const book = new Book(
      bookData.id,
      bookData.code,
      bookData.title,
      bookData.author,
      bookData.stock,
      bookData.available
    );

    await member.returnBook(book, this.borrowedBookRepository);
    book.return();

    await this.memberRepository.save(member);
    await this.bookRepository.save(book);
  }

  async check() {
    const members = await this.memberRepository.findAll();
    return members.map((m) => {
      const member = new Member(
        m.id,
        m.code,
        m.name,
        m.borrowedBooks,
        m.penaltyUntil
      );
      return {
        code: member.code,
        name: member.name,
        penaltyUntil: member.penaltyUntil,
        borrowedBooks: member.borrowedBooks.length,
      };
    });
  }
}

module.exports = MemberService;
