const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const _ = require("lodash");
const helper = require("../utils/helper");
const authMiddleWare = require("../middleware/auth");
//POST login
router.post("/login", async (req, res) => {
    const { userName, password } = req.body;
    const { error } = authValidate(req.body);
    //check validate error
    if (error)
        return res
            .status(400)
            .send(helper.getResponseForm(null, error.details[0].message));
    //check is user existed, if existed then check password
    const user = await User.findOne({ userName });
    if (!user)
        return res
            .status(400)
            .send(
                helper.getResponseForm(
                    null,
                    "Tài khoản hoặc mật khẩu không đúng"
                )
            );

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
        return res
            .status(400)
            .send(
                helper.getResponseForm(
                    null,
                    "Tài khoản hoặc mật khẩu không đúng"
                )
            );

    const token = user.genAuthToken();

    const dataToSend = helper.getResponseForm(null, "Đăng nhập thành công!");
    // return the token in header and send data back to user with status 200 OK
    res.cookie("x-auth-token", token, {
        maxAge: 86400 * 100,
    });
    return res.status(200).send(dataToSend);
});

//POST register new user
router.post("/register", async (req, res) => {
    const { userName, password, email } = req.body;
    //check validate error
    const { error } = validate(req.body);
    if (error)
        return res
            .status(400)
            .send(helper.getResponseForm(null, error.details[0].message));
    //check is user existed in databse
    let user = await User.findOne({ email });
    if (user)
        return res
            .status(400)
            .send(helper.getResponseForm(null, "Email đã tồn tại"));

    user = await User.findOne({ userName });
    if (user)
        return res
            .status(400)
            .send(helper.getResponseForm(null, "Tên tài khoản đã tồn tại"));

    //create new user
    user = new User({
        userName,
        password,
        email,
    });
    //bcrypt set up
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    //save user to db
    User.create(user);

    const token = user.genAuthToken();

    const dataToSend = helper.getResponseForm({
        _id: user._id,
        userName: user.userName,
        email: user.email,
    });
    // return the token in header and send data back to user with status 200 OK
    res.cookie("x-auth-token", token, {
        maxAge: 86400 * 100,
    });
    res.send(dataToSend).status(200);
});

//GET current user
router.get("/me", authMiddleWare, async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id);
    const dataToSend = {
        userName: user.userName,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user._id,
        avatar: user.avatar,
    };
    res.status(200).send(
        helper.getResponseForm(dataToSend, "Get data success")
    );
});

//GET log out
router.get("/me/logout", authMiddleWare, async (req, res) => {
    res.cookie("x-auth-token", "", {
        maxAge: -1,
    })
        .status(200)
        .send(helper.getResponseForm(null, "Đăng xuất thành công!"));
});

//validate function for login validation
const authValidate = (user) => {
    const schema = Joi.object({
        userName: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(1024).required(),
    });

    return schema.validate(user);
};

module.exports = router;
