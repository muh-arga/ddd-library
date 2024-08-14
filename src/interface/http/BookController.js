const express = require("express");
const BookService = require("../../app/book/BookService");

const router = express.Router();
const bookService = new BookService();

router.get("/check", async (req, res) => {
  try {
    const books = await bookService.check();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
