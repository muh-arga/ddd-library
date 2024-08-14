require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bookRoutes = require("./interface/routes/bookRoutes");
const memberRoutes = require("./interface/routes/memberRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.use("/api/book", bookRoutes);
app.use("/api/member", memberRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  try {
    console.log(`Server running http://localhost:${PORT}`);
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  }
});
