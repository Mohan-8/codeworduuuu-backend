const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const userRoutes = require("./routes/userRoutes");
const path = require("path");
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parses JSON body
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data
app.use(cors());

// Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
