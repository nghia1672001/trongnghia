const express = require("express");
const router = express.Router();

const Users = require('../models/user');
router.get("/showanh/:id", async (req, res) => {
    await Users.findById(req.params.id)
        .then(user => {
            const userinfo = new Users({
                Image: user.Image,
                Role: user.Role,
                Message: user.Message.sort((x, y) => {
                    x = x.Seen;
                    y = y.Seen;
                    return (x === y) ? 0 : x ? 1 : -1
                }),
            })

            res.json(userinfo);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});

/*lay ten user*/
router.get("/showname/:id", async (req, res) => {
    await Users.findById(req.params.id)
        .then(user => {
            const userinfo = new Users({
                UserName: user.UserName,
            })

            res.json(userinfo);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});

/*lay role*/
router.get("/getrole/:id", async (req, res) => {
    await Users.findById(req.params.id)
        .then(user => {
            const userrole = new Users({
                Role: user.Role,
            })

            res.json(userrole);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});

router.put("/doianh/:id", async (req, res) => {
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