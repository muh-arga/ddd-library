const BookRepository = require("../BookRepository");

describe("BookRepository", () => {
  let bookRepository;

  beforeEach(() => {
    bookRepository = new BookRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error when findByCode method is not implemented", async () => {
    await expect(bookRepository.findByCode()).rejects.toThrow(
      "Method Not Implemented"
    );
  });

  it("should throw an error when save method is not implemented", async () => {
    await expect(bookRepository.save()).rejects.toThrow(
      "Method Not Implemented"
    );
  });

  it("should throw an error when findAll method is not implemented", async () => {
    await expect(bookRepository.findAll()).rejects.toThrow(
      "Method Not Implemented"
    );
  });
});
