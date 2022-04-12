const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes/segmRoutes");
require("dotenv").config();
const port = process.env.PORT || 4000;
const db = require("./utils/db");
const cors = require("cors");


//use cors to enable frontend to use routes
app.use(cors());
app.options("*", cors()); 

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());

//call routes
app.use(routes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
