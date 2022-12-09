const express = require("express");
const router = express.Router();

const Sach = require('../models/Sach');

router.put("/update/:id", (req, res) => {
    Sach.findById(req.params.id)
        .then(sach => {
            sach.LuotXem = sach.LuotXem+1;

            sach
                .save()
                .then(() => res.json("Updated Successfully"))
                .catch(err => res.status(400).json(`Err: ${err}`))
        })
        .catch(err => res.status(400).json(`Err: ${err}`))
});
module.exports = router;