const mongoose = require("mongoose");
const databaseName = "bethebestenglish";
module.exports = function () {
  mongoose
    .connect(`mongodb://${process.env.dataUrl}/${databaseName}`)
    .then(() => console.log("connected to mongodb...."));
};
