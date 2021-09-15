const Joi = require("joi");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    courseAvatar: {
        type: String,
    },
    name: {
        type: String,
        unique: true,
    },
    bigImage: {
        type: String,
    },
    courseServices: {
        type: Array,
    },
    testimonials: {
        type: Array,
    },
    schedule: {
        type: String,
    },
    time: {
        type: String,
    },
    description: {
        type: String,
    },
});

const Course = mongoose.model("Course", UserSchema);

function validateCourse(user) {
    const schema = Joi.object({
        courseAvatar: Joi.string(),
        name: Joi.string.max(255),
        bigImage: Joi.string(),
        courseServices: Joi.array().length(6),
        testimonials: Joi.array().length(3),
        time: Joi.string().max(255),
        schedule: Joi.string().max(255),
        description: Joi.string(),
    });

    return schema.validate(user);
}

module.exports.Course = Course;
module.exports.validate = validateCourse;
