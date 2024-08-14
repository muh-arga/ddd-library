const express = require("express");
const MemberService = require("../../app/member/MemberService");

const router = express.Router();
const memberService = new MemberService();

/**
 * @swagger
 * /api/member/borrow:
 *   post:
 *     summary: Borrow a book
 *     description: Allows a member to borrow a book if all conditions are met.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - memberCode
 *               - bookCode
 *             properties:
 *               memberCode:
 *                 type: string
 *                 description: The code of the member borrowing the book.
 *               bookCode:
 *                 type: string
 *                 description: The code of the book to be borrowed.
 *     responses:
 *       '200':
 *         description: Book borrowed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example:
 *                    "message": "Success Message"
 *       '400':
 *         description: Error in borrowing the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example:
 *                    "error": "Error Message"
 */

router.post("/borrow", async (req, res) => {
  const { memberCode, bookCode } = req.body;
  try {
    await memberService.borrowBook(bookCode, memberCode);
    res.status(200).json({ message: "Book borrowed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


/**
 * @swagger
 * /api/member/return:
 *   post:
 *     summary: Return a book
 *     description: Allows a member to return a borrowed book.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - memberCode
 *               - bookCode
 *             properties:
 *               memberCode:
 *                 type: string
 *                 description: The code of the member returning the book.
 *               bookCode:
 *                 type: string
 *                 description: The code of the book to be returned.
 *     responses:
 *       '200':
 *         description: Book returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example:
 *                    "message": "Success Message"
 *       '400':
 *         description: Error in returning the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example:
 *                    "error": "Error Message"
 */

router.post("/return", async (req, res) => {
  const { memberCode, bookCode } = req.body;
  try {
    await memberService.returnBook(bookCode, memberCode);
    res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


/**
 * @swagger
 * /api/member/check:
 *   get:
 *     summary: Check member status
 *     description: Retrieve the current status of all members, including the number of books borrowed by each member.
 *     responses:
 *       '200':
 *         description: A list of members and their current borrowed books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                   name:
 *                     type: string
 *                   penaltyUntil:
 *                     type: string
 *                     format: date
 *                   borrowedBooks:
 *                     type: integer
 *             example:
 *                - code: "M001"
 *                  name: "John Doe"
 *                  penaltyUntil: null
 *                  borrowedBooks: 2
 *                - code: "M002"
 *                  name: "Jane Doe"
 *                  penaltyUntil: "2024-08-17"
 *                  borrowedBooks: 1
 *       '400':
 *         description: Error in retrieving member status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */

router.get("/check", async (req, res) => {
  try {
    const member = await memberService.check();
    res.status(200).json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
