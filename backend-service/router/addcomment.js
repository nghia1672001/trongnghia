const express = require("express");
const router = express.Router();

const mongoose = require('mongoose');

const Sach = require('../models/Sach');
const Users = require('../models/user');
const Comment = require('../models/binhluan');
//Lấy bình luận
router.get("/alls", (req, res) => {
    Comment.find()
        .then(comment => res.json(comment))
        .catch(err => res.status(400).json(`Error: ${err}`))
});
//Thêm bình luận
router.post("/addcomment/:id/:_id", async (req, res) => {
    const newComment = new Comment({
        NoiDung: req.body.NoiDung
    })

    var error = "";
    var result = "";

    newComment.save()
        .then(() => result = "Comment added")
        .catch(err => error += err);

    await Users.findById(req.params.id)
        .then(user => {
            user.BinhLuan.push(newComment);
            user.save()
                .then(() => {
                    result += "Comment Posted To User!!!";
                })
                .catch(err => error += err)
        })
        .catch(err => error += err)

    if (error != "") {
        res.status(400).json(`Error: ${error}`)
    }
    else {
        Sach.findById(req.params._id)
            .then(sach => {
                sach.BinhLuan.push(newComment);
                sach.save()
                    .then(() => {
                        res.json(result + "Comment Posted To Sach!!!");
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    }
})

router.put("/usercommentinfo/:id", async(req, res) => {
    await Users.findOne({ "BinhLuan._id": mongoose.Types.ObjectId(req.params.id) })
        .then(user => res.json({
            "userimage": user.Image, "username": user.UserName,
        }))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

module.exports = router;