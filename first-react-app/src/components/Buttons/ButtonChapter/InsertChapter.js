import React, { useState } from 'react'

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function InsertChapter(bookid) {
    const [chapter, setChapter] = useState("");
    const [chaptercontent, setChapterContent] = useState("");

    const navigate = useNavigate();

    function onAddChapterPress() {
        document.getElementById("chapteraddbtn").style.display = "none";
        document.getElementById("chapterrmbtn").style.display = "block";
        document.getElementById("chapterinput").style.display = "block";
        document.getElementById("chaptercheckbtn").style.display = "block";
        document.getElementById("chaptermota").style.display = "block";
    }

    function onRemoveChapterPress() {
        document.getElementById("chapterinput").style.display = "none";
        document.getElementById("chapterrmbtn").style.display = "none";
        document.getElementById("chapteraddbtn").style.display = "block";
        document.getElementById("chaptercheckbtn").style.display = "none";
        document.getElementById("chaptermota").style.display = "none";
    }
    function onConfirmChapterPress() {
        if (chapter === "") {
            alert("Vui lòng nhập chương");
            return;
        }
        else {
            const Chapter = {
                ChapterTitle: chapter,
                ChapterContent: chaptercontent
            }
            axios
                .post(`http://localhost:4000/add/addchapter/${bookid.bookid}`, Chapter)
                .then(() => {
                    alert("thêm thành công");
                    const currentbookid = localStorage.getItem("currentbook");
                    navigate(`/trangchapter/${currentbookid.slice(0, 7)}`);
                    window.location.reload();
                })
                .catch(err => {
                    alert(err);
                });
        }
    }
    return (
        <div>
            <div style={{ display: "inline-block", padding: "10px", alignItems: "center" }}>
                <ControlPointIcon style={{ display: "inline-block", cursor: "pointer" }} id='chapteraddbtn' onClick={onAddChapterPress}></ControlPointIcon>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "5px" }}>
                    <RemoveCircleOutlineIcon style={{ display: "none", cursor: "pointer" }} id='chapterrmbtn' onClick={onRemoveChapterPress}></RemoveCircleOutlineIcon>

                    <input onChange={e => setChapter(e.target.value)} style={{ margin: "5px 0px", display: "none", padding: "5px", width: "100%" }} id='chapterinput' type="text" placeholder="Nhập tên chương"></input>
                    <textarea value={chaptercontent ?? ""} onChange={e => setChapterContent(e.target.value)} style={{ display: "none", width: "100%" }} id="chaptermota"> </textarea>

                    <CheckCircleIcon onClick={onConfirmChapterPress} id="chaptercheckbtn" style={{ display: "none", margin: "3px", cursor: "pointer" }}></CheckCircleIcon>
                </div>
            </div>
        </div>
    )
}

export default InsertChapter