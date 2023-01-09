const express = require("express");
const router = express.Router();

const mongoose = require('mongoose');

const Ban = require('../models/ban');
const User = require('../models/user');

/*Lấy tất cả các bàn đã đặt*/
router.get("/table", (req, res) => {
    Ban.find()
        .then(ban => res.json(ban))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

/*Đặt bàn mới*/
router.post("/booktableform/:userid", async (req, res) => {
    const booknewtable = new Ban({
        NgayThue: req.body.NgayThue,
        SoBan: req.body.SoBan,
        TinhTrang: 3,
        NguoiMuon: req.params.userid,
    });

    await Ban.insertMany(booknewtable)
        .then(() => res.json("thêm thành công"))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

/*Admin đồng ý cho mượn bàn*/
router.put("/confirmbooktable/:userid/:booktableid", async (req, res) => {
    await Ban.findById(req.params.booktableid)
        .then((booktable) => {
            booktable.TinhTrang = 2;
            booktable
                .save()
                .then(() => res.json("Updated Successfully"))
                .catch(err => res.status(400).json(`Err: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
})
/*Admin xác nhận trả bàn*/
router.put("/confirm/:userid/:booktableid", async (req, res) => {
    await Ban.findById(req.params.booktableid)
        .then((booktable) => {
            booktable.TinhTrang = 1;
            booktable
                .save()
                .then(() => res.json("Updated Successfully"))
                .catch(err => res.status(400).json(`Err: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
})
module.exports = router;


