const express = require("express");
const router = express.Router();

const Users = require('../models/user');

//REQUEST FOR REGISTER 
router.post("/form", async (req, res) => {
    await Users.findOne({ TaiKhoan: req.body.TaiKhoan })
        .then(user => {
            if (user) {
                res.json("Tài khoản đã tồn tại");
            }
            else {
                const user = new Users({
                    TaiKhoan: req.body.TaiKhoan,
                    MatKhau: req.body.MatKhau,
                    Email: req.body.Email,
                    UserName: req.body.UserName,
                    Image: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360",
                    NgaySinh: "",
                    GioiTinh: "",
                    SoDienThoai: "",
                    Role: "user",
                    MSSV: "",
                });

                user.save()
                    .then(() => res.json("Đăng kí thành công"))
                    .catch(err => res.status(400).json(`Error: ${err}`));
            }
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});


module.exports = router;