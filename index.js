const express = require('express');
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3300;

app.use(bodyParser.json());

app.use('/users', require("./router/user"));
app.use('/posts', require("./router/post"));
app.use('/tags', require("./router/tag"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
