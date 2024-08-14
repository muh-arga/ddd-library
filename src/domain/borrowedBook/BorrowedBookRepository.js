class BorrowedBookRepository {
  async create(borrowedBook) {
    throw new Error("Method Not Implemented");
  }

  async findByMember(memberCode) {
    throw new Error("Method Not Implemented");
  }

  async findByMemberAndBook(memberCode, bookCode) {
    throw new Error("Method Not Implemented");
  }

  async update(borrowedBook) {
    throw new Error("Method Not Implemented");
  }
}

module.exports = BorrowedBookRepository;
