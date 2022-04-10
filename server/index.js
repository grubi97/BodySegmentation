const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes/segmRoutes");
require("dotenv").config();

const port = process.env.PORT;
const db = require("./utils/db");
const cors = require("cors");

app.use(cors());
app.options("*", cors()); // this enables preflight

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());

app.use(routes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
