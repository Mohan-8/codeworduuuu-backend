
const express = require("express");
const router = express.Router();
const { decrypt, encrypt, chk } = require("../controllers/userController");

const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });

router.get("/", chk);
router.post("/encrypt", csrfProtection, encrypt);
router.post("/decrypt", csrfProtection, decrypt);

module.exports = router;
