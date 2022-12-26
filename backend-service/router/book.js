const express = require("express");
const router = express.Router();

const Sach = require('../models/Sach');

router.get("/alls", (req, res) => {
    Sach.find()
        .then(sach => {
            var tempsach = sach;
            for(var k in tempsach){
                
                tempsach[k].Chapter=tempsach[k].Chapter.reverse();
            }
            
            res.json(tempsach.reverse())
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});

/*Search book*/
router.post("/search", (req, res) => {
    Sach.find({ TenSach: { $regex: req.body.searchResult } })
        .then(sach => res.json(sach))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

router.get("/alldecreaseview", (req, res) => {
    Sach.find({}).sort({LuotXem: "desc"})
        .then(sach => res.json(sach))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

module.exports = router;