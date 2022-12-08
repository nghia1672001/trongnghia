const express = require("express");
const router = express.Router();

const Users = require('../models/user');
router.get("/showmatkhau/:id", async (req, res) => {
    await Users.findById(req.params.id)
        .then(user => {
            const userinfo = new Users({
                MatKhau: user.MatKhau,
            })
            
            res.json(userinfo);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});
router.post("/doimatkhau/:id", async (req, res)  => {
    await Users.findById(req.params.id)
    .then(user => {
        user.MatKhau = req.body.MatKhau

        user
            .save()
            .then(() => res.json("Updated Successfully"))
            .catch(err => res.status(400).json(`Err: ${err}`))
    })
    .catch(err => res.status(400).json(`Err: ${err}`))
});

module.exports = router;