const express = require("express");
const router = express.Router();

const Users = require('../models/user');
router.get("/showanh/:id", async (req, res) => {
    await Users.findById(req.params.id)
        .then(user => {
            const userinfo = new Users({
                Image: user.Image,
            })
            
            res.json(userinfo);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});
router.put("/doianh/:id", async (req, res)  => {
    await Users.findById(req.params.id)
    .then(user => {
        user.Image = req.body.Image

        user
            .save()
            .then(() => res.json("Updated Successfully"))
            .catch(err => res.status(400).json(`Err: ${err}`))
    })
    .catch(err => res.status(400).json(`Err: ${err}`))
});

module.exports = router;