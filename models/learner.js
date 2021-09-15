const Joi = require("joi");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        min: 5,
        max: 255,
    },
    name: {
        type: String,
        max: 255,
    },
    nameOfCourse: {
        type: String,
    },
    note: {
        type: String,
    },
    phoneNumber: {
        type: String,
        max: 20,
    },
    date: {
        type: String,
    },
});

const Learner = mongoose.model("learner", UserSchema);

function validateLearner(learner) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).email(),
        name: Joi.string().max(255),
        nameOfCourse: Joi.string(),
        note: Joi.string(),
        phoneNumber: Joi.string().max(20),
        date: Joi.string(),
    });

    return schema.validate(learner);
}

module.exports.Learner = Learner;
module.exports.validate = validateLearner;
