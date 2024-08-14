const express = require("express");
const MemberService = require("../../app/member/MemberService");

const router = express.Router();
const memberService = new MemberService();

router.post("/borrow", async (req, res) => {
  const { memberCode, bookCode } = req.body;
  try {
    await memberService.borrowBook(bookCode, memberCode);
    res.status(200).json({ message: "Book borrowed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/return", async (req, res) => {
  const { memberCode, bookCode } = req.body;
  try {
    await memberService.returnBook(bookCode, memberCode);
    res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/check", async (req, res) => {
  try {
    const member = await memberService.check();
    res.status(200).json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
