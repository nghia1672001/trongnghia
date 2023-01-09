const express = require("express");
const router = express.Router();

const TheLoai = require('../models/theloai');
/*get the loai*/
router.get("/category", (req, res) => {
    TheLoai.find()
        .then(category => res.json(category))
        .catch(err => res.status(400).json(`Error: ${err}`))
});
/*Post the loai*/
router.post("/categoryform", async (req, res) => {
    const newcategory = new TheLoai({
        TenTheLoai: req.body.TenTheLoai,
        MoTa: req.body.MoTa,
    });

    await TheLoai.insertMany(newcategory)
        .then(() => res.json("thêm thành công"))
        .catch(err => res.status(400).json(`Error: ${err}`));
});
module.exports = router;