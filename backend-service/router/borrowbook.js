const express = require("express");
const router = express.Router();

const mongoose = require('mongoose');

const Xuli = require('../models/xuli');
const User = require('../models/user');
const Message = require('../models/message');

/*User muon sach*/
router.post("/borrowbook/:userid/:bookid", async (req, res) => {
    await Xuli.findOne({
        User: mongoose.Types.ObjectId(req.params.userid),
        Sach: mongoose.Types.ObjectId(req.params.bookid),
        TinhTrang: 3,
    })
        .then(xuli => {
            if (xuli) {
                res.json("da nhan yeu cau cua ban! Cho xu li")
            }
            else {
                const borrowbook = new Xuli({
                    Sach: req.params.bookid,
                    User: req.params.userid,
                    TinhTrang: 3,
                    NgayMuon: req.body.NgayMuon,
                    NgayTra: req.body.NgayTra,
                })
                borrowbook.save()
                    .then(() => {
                        User.find({ Role: "admin" })
                            .then(admin => {
                                const message = new Message({
                                    Noidung: "co user yeu cau muon sach",
                                    Seen: false,
                                })
                                for (var i in admin) {
                                    admin[i].Message.push(message);
                                    admin[i].save()
                                        .then(() => console.log(i))
                                        .catch((err) => console.log(err))
                                }
                            })

                        res.json("da muon sach thanh cong!")
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`));
            }
        })
})
/* Xac nhan admin da dua sach*/
router.put("/confirmborrow/:xuliid/:userid", async (req, res) => {
    var result = "";
    var error = "";
    await Xuli.findById(req.params.xuliid)
        .then(async (xuli) => {
            xuli.TinhTrang = 2;

            await User.findById(req.params.userid)
                .then(async (user) => {
                    const message = new Message({
                        Noidung: "da nhan duoc yeu cau muon sach! Moi ban den lay sach",
                        Seen: false,
                    })
                    user.Message.push(message);

                    await user.save().then(() => result += "them message thanh cong").catch(err => error += err);
                })
                .catch(err => error += err);

            xuli.save()
                .then(() => res.json(result + "cap nhat tinh trang thanh cong"))
                .catch(err => error += err + ",")

        })
        .catch(err => res.status(400).json(`Error: ${error += err}`))

})

/* Admin xac nhan tra sach*/

router.put("/confirm/:xuliid/:userid", async (req, res) => {
    var result = "";
    var error = "";
    await Xuli.findById(req.params.xuliid)
        .then(async (xuli) => {
            xuli.TinhTrang = 1;

            await User.findById(req.params.userid)
                .then(async (user) => {
                    const message = new Message({
                        Noidung: "Da tra sach thanh cong!",
                        Seen: false,
                    })
                    user.Message.push(message);

                    await user.save().then(() => result += "them message thanh cong").catch(err => error += err);
                })
                .catch(err => error += err);

            xuli.save()
                .then(() => res.json(result + "cap nhat tinh trang thanh cong"))
                .catch(err => error += err + ",")

        })
        .catch(err => res.status(400).json(`Error: ${error += err}`))

})

/*admin yeu cau tra sach*/
router.post("/request/:userid", async (req, res) => {
    var error = "";
    await User.findById(req.params.userid)
        .then((user) => {
            const message = new Message({
                Noidung: req.body.Noidung,
                Seen: false,
            })

            user.Message.push(message);
            user.save()
                .then(() => res.json("them message thanh cong"))
                .catch(err => error += err);
        })
        .catch(err => error += err);
})

/*da doc message*/
router.put("/confirmseen/:userid/:messageid", async (req, res) => {
    User.findOneAndUpdate(
        { "_id": mongoose.Types.ObjectId(req.params.userid), "Message._id": mongoose.Types.ObjectId(req.params.messageid) },
        {
            "$set": {
                "Message.$.Seen": true,
            }
        }
    )
        .then(() => res.json("Da Doc Tin Nhan"))
        .catch(err => res.status(400).json(`Err: ${err}`))
})

/* lay all xu li cho admin */
router.get("/getxuli", async (req, res) => {
    Xuli.find({}).sort({ TinhTrang: "desc" })
        .then(xuli => res.json(xuli))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

/* lay xu li cho user */
router.get("/getxuliuser/:userid", async (req, res) => {
    Xuli.find({ User: req.params.userid }).sort({ NgayTra: "desc" })
        .then(xuli => res.json(xuli))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

/*Hien thi message*/
router.get("/getmessage/:userid", async (req, res) => {
    User.findById(req.params.userid)
        .then(user => {
            res.json(user.Message);
        })

        .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router;
