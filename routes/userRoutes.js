const express = require("express");
const userRoute = express.Router();
const { encrypt, decrypt, chk } = require("../controllers/userController");

userRoute.route("/api").get(chk);

userRoute.route("/api/encrypt").post(encrypt);

userRoute.route("/api/decrypt").post(decrypt);

module.exports = userRoute;
