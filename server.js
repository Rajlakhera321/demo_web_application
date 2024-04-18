const express = require("express");
const {connection} = require("./db");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8000;
connection();

app.use("/api/v1", require("./src/router/user"));

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));