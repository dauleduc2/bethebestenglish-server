const express = require("express");
const router = express.Router();
const { Course, validate } = require("../models/courses");
const helper = require("../utils/helper");
const authMiddleWare = require("../middleware/auth");
router.get("/", async (req, res) => {
    const dataCourse = await Course.find({});
    res.send(helper.getResponseForm(dataCourse, "get data success!")).status(
        200
    );
});

router.post("/", authMiddleWare, async (req, res) => {
    const {
        name,
        courseAvatar,
        bigImage,
        courseServices,
        testimonials,
        time,
        schedule,
        description,
    } = req.body;
    const { isAdmin } = req.user;
    if (!isAdmin) {
        res.send("No access on this action!").status(400);
    }
    const { error } = req.body;
    if (error)
        return res
            .status(400)
            .send(
                helper.getResponseForm(
                    null,
                    "there are anything wrong in your data, check again!"
                )
            );
    let course = await Course.findOne({ name });
    if (course)
        return res
            .status(400)
            .send(
                helper.getResponseForm(
                    null,
                    "This course name already have in database"
                )
            );
    // create new course
    course = new Course({
        name,
        courseAvatar,
        bigImage,
        courseServices,
        testimonials,
        time,
        schedule,
        description,
    });
    //save to db
    Course.create(course);
    res.send("create success !").status(200);
});

router.delete("/:course", authMiddleWare, async (req, res) => {
    const { course } = req.params;
    const { isAdmin } = req.user;
    if (!isAdmin) {
        res.send("You have to be admin to use this function").status(400);
    }
    const response = await Course.deleteOne({ name: course });
    if (response.deletedCount === 0) {
        res.send("Can't find the course to delete!");
    }
    res.send("delete success").status(200);
});

module.exports = router;
