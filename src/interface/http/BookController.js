const express = require("express");
const BookService = require("../../app/book/BookService");

const router = express.Router();
const bookService = new BookService();


/**
 * @swagger
 * /api/book/check:
 *   get:
 *     description: Use to check the books
 *     responses:
 *       '200':
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   availableStock:
 *                     type: integer
 *               example:
 *                 - code: "B001"
 *                   title: "The Great Gatsby"
 *                   author: "F. Scott Fitzgerald"
 *                   availableStock: 5
 *                 - code: "B002"
 *                   title: "To Kill a Mockingbird"
 *                   author: "Harper Lee"
 *                   availableStock: 3
 *       '400':
 *         description: Error
 */

router.get("/check", async (req, res) => {
  try {
    const books = await bookService.check();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
