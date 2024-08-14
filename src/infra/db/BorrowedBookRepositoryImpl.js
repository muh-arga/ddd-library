const prisma = require("./prisma/prismaClient");
const BorrowedBookRepository = require("../../domain/borrowedBook/BorrowedBookRepository");

class BorrowedBookRepositoryImpl extends BorrowedBookRepository {
  async create(borrowedBook) {
    return await prisma.borrowedBook.create({
      data: borrowedBook,
    });
  }

  async findByMember(memberCode) {
    return await prisma.borrowedBook.findMany({
      where: { memberCode },
    });
  }

  async findByMemberAndBook(memberCode, bookCode) {
    return await prisma.borrowedBook.findFirst({
      where: { memberCode, bookCode, returnedAt: null },
    });
  }

  async update(borrowedBook) {
    return await prisma.borrowedBook.update({
      where: { id: borrowedBook.id },
      data: borrowedBook,
    });
  }
}

module.exports = BorrowedBookRepositoryImpl;
