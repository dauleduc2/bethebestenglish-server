//dotenv set up file
const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, `./config/.env.${process.env.NODE_ENV}`),
});
//config
const express = require("express");
const app = express();
const cors = require("cors");
var cookieParser = require("cookie-parser");
app.use(cors({ origin: process.env.client_url, credentials: true }));
app.use(cookieParser());
//set up for route, database and middleware
require("./startup/routes")(app);
require("./startup/db")();

const port = process.env.PORT || 27017;
app.listen(port, () => console.log(`listen on port ${port}...`));
