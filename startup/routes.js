const express = require("express");
const userRoute = require("../routes/user");
const homeRoute = require("../routes/home");

module.exports = function (app) {
  app.use(express.json());
  app.use("/", homeRoute);
  app.use("/account", userRoute);
};
