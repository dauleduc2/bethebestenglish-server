var bodyParser = require("body-parser");
module.exports = function (app) {
  if (process.env.jwtSecretKey) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
};
