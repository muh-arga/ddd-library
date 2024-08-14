class Member {
  constructor(id, code, name, borrowedBooks, penaltyUntil = null) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.borrowedBooks = borrowedBooks;
    this.penaltyUntil = penaltyUntil;
  }

  canBorrow() {
    if (this.penaltyUntil && new Date() < this.penaltyUntil) {
      return false;
    }

    return this.borrowedBooks.length < 2;
  }

  async borrowBook(book, borrowedBookRepository) {
    if (!this.canBorrow()) {
      throw new Error("Member cannot borrow book");
    }

    if (!book.isAvailable()) {
      throw new Error("Book is not available");
    }

    await borrowedBookRepository.create({
      bookCode: book.code,
      memberCode: this.code,
    });
  }

  async returnBook(book, borrowedBookRepository) {
    const record = await borrowedBookRepository.findByMemberAndBook(
      this.code,
      book.code
    );
    if (!record || record.returnedAt) {
      throw new Error("This book not borrowed by this member");
    }

    const returnDate = new Date();
    const daysBorrowed = Math.floor(
      (returnDate - record.borrowedAt) / (1000 * 60 * 60 * 24)
    );

    let penalty = 0;

    if (daysBorrowed > 7) {
      this.setPenalty();
      penalty = 1;
    }

    await borrowedBookRepository.update({
      id: record.id,
      returnedAt: returnDate,
      penalty,
    });
  }

  setPenalty(days = 3) {
    this.penaltyUntil = new Date();
    this.penaltyUntil.setDate(this.penaltyUntil.getDate() + days);
  }
}

module.exports = Member;
