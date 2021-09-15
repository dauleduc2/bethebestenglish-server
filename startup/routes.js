const express = require("express");
const userRoute = require("../routes/user");
const courseRoute = require("../routes/course");
const learnerRoute = require("../routes/learner");
const compression = require("compression");
const helmet = require("helmet");

module.exports = function (app) {
    app.use(express.json());
    app.use(compression());
    app.use(helmet());
    app.use(express.static(process.cwd() + "/public/"));
    app.use("/api/course", courseRoute);
    app.use("/api/learner", learnerRoute);
    app.use("/account", userRoute);

    app.get("/*", (req, res) => {
        res.sendFile(process.cwd() + "/public/index.html");
    });
};
