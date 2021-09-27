const mongoose = require("mongoose");
const databaseName = "bethebestenglish";
module.exports = function () {
    mongoose
        .connect(`${process.env.dataUrl}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("connected to mongodb...."));
};
