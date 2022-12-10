const express = require("express");
const router = express.Router();

const mongoose = require('mongoose');

const Sach = require('../models/Sach');
const TacGia = require('../models/tacgia');
const Chapter = require('../models/chapter');
const TheLoai = require('../models/theloai');

router.put("/singlebook/:id", async (req, res) => {
    await Sach.findById(req.params.id)
        .then(sach => res.json(sach))
        .catch(err => res.status(400).json(`Error: ${err}`))
})
router.put("/singlechapter/:id/:_id", async (req, res) => {
    await Sach.findOne({ "_id": mongoose.Types.ObjectId(req.params.id), "Chapter._id": mongoose.Types.ObjectId(req.params._id) })
        .then(sach => {
            sach.Chapter.filter(chapter =>{
                if(chapter._id.equals(mongoose.Types.ObjectId(req.params._id))){
                    return true;
                }
                else return false;
            }).map(chapter => res.json(chapter))
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
})
router.put("/updatebook/:id", async (req, res) => {
    await Sach.findById(req.params.id)
        .then(sach => {
            sach.TenSach = req.body.TenSach,
                sach.SoLuong = req.body.SoLuong,
                sach.MoTa = req.body.MoTa,
                sach.NamSangTac = req.body.NamSangTac,
                sach.ViTri = req.body.ViTri,
                sach.BookImage = req.body.BookImage,

                sach
                    .save()
                    .then(() => res.json("Updated Successfully"))
                    .catch(err => res.status(400).json(`Err: ${err}`))
        })
        .catch(err => res.status(400).json(`Err: ${err}`))
});
router.put("/updatepdf/:id", async (req, res) => {
    await Sach.findById(req.params.id)
        .then(sach => {
            sach.TenSach = req.body.TenSach,
                sach.NoiDung = req.body.NoiDung,
                sach.SoLuong = req.body.SoLuong,
                sach.MoTa = req.body.MoTa,
                sach.ViTri = req.body.ViTri,
                sach.NamSangTac = req.body.NamSangTac,

                sach
                    .save()
                    .then(() => res.json("Updated Successfully"))
                    .catch(err => res.status(400).json(`Err: ${err}`))
        })
        .catch(err => res.status(400).json(`Err: ${err}`))
});

router.post("/book", async (req, res) => {
    await Sach.findOne({ TenSach: req.body.TenSach })
        .then(sach => {
            if (sach) {
                res.json("Sach da ton tai");
                return;
            }
            else {
                const nsach = new Sach({
                    TenSach: req.body.TenSach,
                    NoiDung: req.body.NoiDung,
                    SoLuong: req.body.SoLuong,
                    MoTa: req.body.MoTa,
                    BookImage: req.body.BookImage,
                    NamSangTac: req.body.NamSangTac,
                    ViTri: req.body.ViTri,
                    LuotXem: "0",
                });

                nsach.save()
                    .then((b) => res.json({ "response": "Updated Successfully", "bookid": b }))
                    .catch(err => res.status(400).json(`Error: ${err}`));
            }
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});
router.delete("/:id", (req, res) => {
    Sach.findByIdAndDelete(req.params.id)
        .then(() => res.json("Deleted Succesfully"))
        .catch(err => res.status(400).json(`Err: ${err}`))
});
//Thêm chapter
router.post("/addchapter/:id", (req, res) => {
    const newChapter = new Chapter({
        ChapterTitle: req.body.ChapterTitle,
        ChapterContent: req.body.ChapterContent
    })

    Sach.findById(req.params.id)
        .then(sach => {
            sach.Chapter.push(newChapter);
            sach.save()
                .then(() => res.json("Chapter Posted Success!!!"))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
})
//Xóa chapter
router.put("/deletechapter/:id/:_id", (req, res) => {
    Sach.findOneAndUpdate(
        { "_id": mongoose.Types.ObjectId(req.params.id) },
        {
            "$pull": {
                "Chapter": {
                    "_id": mongoose.Types.ObjectId(req.params._id)
                }
            }
        }
    )
        .then(() => res.json("Chapter Deleted Succesfully"))
        .catch(err => res.status(400).json(`Err: ${err}`))
});

//Update chapter
router.put("/updatechapter/:id/:_id", (req, res) => {
    Sach.findOneAndUpdate(
        { "_id": mongoose.Types.ObjectId(req.params.id), "Chapter._id": mongoose.Types.ObjectId(req.params._id) },
        {
            "$set": {
                "Chapter.$.ChapterTitle": req.body.ChapterTitle,
                "Chapter.$.ChapterContent": req.body.ChapterContent,
            }
        }
    )
        .then(() => res.json("Chapter Updated Succesfully"))
        .catch(err => res.status(400).json(`Err: ${err}`))
});

//Xóa tác giả
router.put("/deleteauthor/:id/:_id", (req, res) => {
    Sach.findOneAndUpdate(
        { "_id": mongoose.Types.ObjectId(req.params.id) },
        {
            "$pull": {
                "TacGia": {
                    "_id": mongoose.Types.ObjectId(req.params._id)
                }
            }
        }
    )
        .then(() => res.json("Chapter Deleted Succesfully"))
        .catch(err => res.status(400).json(`Err: ${err}`))
});

//Update tác giả
router.put("/updateauthor/:id/:_id", (req, res) => {
    Sach.findOneAndUpdate(
        { "_id": mongoose.Types.ObjectId(req.params.id), "TacGia._id": mongoose.Types.ObjectId(req.params._id) },
        {
            "$set": {
                "TacGia.$.TenTacGia": req.body.TenTacGia,
                "TacGia.$.Mota": req.body.Mota,
            }
        }
    )
        .then(() => res.json("Chapter Updated Succesfully"))
        .catch(err => res.status(400).json(`Err: ${err}`))
});

//Xóa thể loại
router.put("/deletecategory/:id/:_id", (req, res) => {
    Sach.findOneAndUpdate(
        { "_id": mongoose.Types.ObjectId(req.params.id) },
        {
            "$pull": {
                "TheLoai": {
                    "_id": mongoose.Types.ObjectId(req.params._id)
                }
            }
        }
    )
        .then(() => res.json("Chapter Deleted Succesfully"))
        .catch(err => res.status(400).json(`Err: ${err}`))
});

//Update thể loại
router.put("/updatecategory/:id/:_id", (req, res) => {
    Sach.findOneAndUpdate(
        { "_id": mongoose.Types.ObjectId(req.params.id), "TheLoai._id": mongoose.Types.ObjectId(req.params._id) },
        {
            "$set": {
                "TheLoai.$.TenTheLoai": req.body.TenTheLoai,
                "TheLoai.$.MoTa": req.body.MoTa,
            }
        }
    )
        .then(() => res.json("Chapter Updated Succesfully"))
        .catch(err => res.status(400).json(`Err: ${err}`))
});

//Thêm tác giả
router.post("/addauthor/:id", (req, res) => {
    const newTacGia = new TacGia({
        TenTacGia: req.body.TenTacGia,
        Mota: req.body.Mota
    })

    Sach.findById(req.params.id)
        .then(sach => {
            sach.TacGia.push(newTacGia);
            sach.save()
                .then(() => res.json("Authorize Posted Success!!!"))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
})

//Thêm thể loại
router.post("/addcategory/:id/:cid", async (req, res) => {
    const newcategory = new TheLoai({
        TenTheLoai: "",
        MoTa: ""
    });

    await TheLoai.findById(req.params.cid)
        .then(theloai => {
            newcategory.TenTheLoai = theloai.TenTheLoai;
            newcategory.MoTa = theloai.MoTa;
        })
        .catch(error => res.status(400).json(`Error: ${error}`))

    Sach.findById(req.params.id)
        .then(sach => {
            sach.TheLoai.push(newcategory);
            sach.save()
                .then(() => res.json("Category Posted Success!!!"))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router;