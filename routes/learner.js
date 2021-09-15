const express = require("express");
const router = express.Router();
const { Learner, validate } = require("../models/learner");
const helper = require("../utils/helper");
const authMiddleWare = require("../middleware/auth");
router.get("/", authMiddleWare, async (req, res) => {
    const { isAdmin } = req.user;
    if (!isAdmin) {
        res.send("You have to be admin to use this function").status(400);
    }
    const data = await Learner.find({});
    res.send(helper.getResponseForm(data, "get data success!")).status(200);
});

router.post("/", async (req, res) => {
    const { email, name, nameOfCourse, note, phoneNumber, date } = req.body;
    const { error } = validate(req.body);
    if (error)
        return res
            .status(400)
            .send(
                helper.getResponseForm(
                    null,
                    "there are anything wrong in your data, check again!"
                )
            );
    //create new learner
    const learner = new Learner({
        email,
        name,
        nameOfCourse,
        note,
        phoneNumber,
        date,
    });
    //save
    Learner.create(learner);
    res.send("send success !").status(200);
});

router.delete("/:learnerID", authMiddleWare, async (req, res) => {
    const { isAdmin } = req.user;
    if (!isAdmin) {
        res.send("You have to be admin to use this function").status(400);
    }
    const ID = req.params.learnerID;
    const response = await Learner.deleteOne({ _id: ID });
    if (response.deletedCount === 0) {
        res.send("Can't find the learner to delete!");
    }
    res.send("remove success").send(200);
});

module.exports = router;
