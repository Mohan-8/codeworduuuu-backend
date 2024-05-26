const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/api", require("./routes/userRoutes"));
app.post("/api/encrypt", require("./routes/userRoutes"));
app.post("/api/decrypt", require("./routes/userRoutes"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
