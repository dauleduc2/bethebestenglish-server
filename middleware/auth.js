const helper = require("../utils/helper");
const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  const token = req.cookies["x-auth-token"];
  if (!token)
    return res
      .status(401)
      .send(helper.getResponseForm(null, "No token in cookie"));

  try {
    const data = jwt.verify(token, process.env.jwtSecretKey);
    req.user = data;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
    return;
  }
};
