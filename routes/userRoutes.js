const express = require("express");
const multer = require("multer");
const router = express.Router();
const { encrypt, decrypt, chk } = require("../controllers/userController");

// Multer configuration
const storage = multer.memoryStorage(); // Store file in memory (change for file-based storage)
const upload = multer({ storage: storage });

router.get("/", chk);
router.post("/encrypt", upload.single("image"), encrypt);
router.post("/decrypt", upload.single("image"), decrypt);

module.exports = router;
