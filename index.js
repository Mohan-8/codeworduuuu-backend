const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const csrfProtection = csrf({ cookie: true });
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://codeworduuuu-frontend.vercel.app/",
    credentials: true,
  })
);
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", csrfProtection, (req, res) => {
  res.render("index", { csrfToken: req.csrfToken() });
});

const userRoutes = require("./routes/userRoutes");

app.use("/api", userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
