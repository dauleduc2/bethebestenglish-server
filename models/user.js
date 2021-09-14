const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  email: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 300,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: null,
  },
});

//auto genToken function
UserSchema.methods.genAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.jwtSecretKey
  );
  return token;
};
const User = mongoose.model("User", UserSchema);

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Tên email không hợp lệ",
      "any.required": "Email là bắt buộc",
    }),
    userName: Joi.string().min(5).max(50).required().messages({
      "any.required": "Tên đăng nhập là bắt buộc",
      "string.min": "Tên đăng nhập tối thiểu là 5 chữ cái",
      "string.max": "Tên đăng nhập tối đa là 50 chữ cái",
    }),
    password: Joi.string().min(5).required().messages({
      "any.required": "Mật khẩu là bắt buộc",
      "string.min": "Mật khẩu tối thiểu là 5 chữ cái",
    }),
    confirmPassword: Joi.string()
      .min(5)
      .max(1024)
      .required()
      .valid(Joi.ref("password"))
      .messages({
        "any.only": "Mật khẩu và xác nhận mật khẩu không trùng nhau",
        "any.required": "Xác nhận mật khẩu là bắt buộc",
      }),
  });

  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
