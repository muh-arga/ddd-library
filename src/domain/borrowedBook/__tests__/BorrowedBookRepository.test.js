const BorrowedBookRepository = require("../BorrowedBookRepository");

describe("BorrowedBookRepository", () => {
  let borrowedBookRepository;

  beforeEach(() => {
    borrowedBookRepository = new BorrowedBookRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error when create method is not implemented", async () => {
    await expect(borrowedBookRepository.create()).rejects.toThrow(
      "Method Not Implemented"
    );
  });

  it("should throw an error when findByMember method is not implemented", async () => {
    await expect(borrowedBookRepository.findByMember()).rejects.toThrow(
      "Method Not Implemented"
    );
  });

  it("should throw an error when findByMemberAndBook method is not implemented", async () => {
    await expect(borrowedBookRepository.findByMemberAndBook()).rejects.toThrow(
      "Method Not Implemented"
    );
  });

  it("should throw an error when update method is not implemented", async () => {
    await expect(borrowedBookRepository.update()).rejects.toThrow(
      "Method Not Implemented"
    );
  });
});
