const express = require("express");
const router = express.Router();

const Sach = require('../models/Sach');

router.get("/alls", (req, res) => {
    Sach.find()
        .then(sach => res.json(sach))
        .catch(err => res.status(400).json(`Error: ${err}`))
});


router.get("/alldecreaseview", (req, res) => {
    Sach.find({}).sort({LuotXem: "desc"})
        .then(sach => res.json(sach))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

module.exports = router;