import React, { useState, useEffect } from 'react'

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import axios from 'axios';

import { useLocation, useNavigate } from 'react-router-dom';

function InsertChapter(bookid) {
    const [chapter, setChapter] = useState("");
    const [chaptercontent, setChapterContent] = useState("");

    const navigate = useNavigate();

    const location = useLocation();
    const [userrole, setUserRole] = useState('noneuser');
    const checkIfLoggedUser = localStorage.getItem('user');

    useEffect(() => {
        if (checkIfLoggedUser) {
            axios.get(`http://localhost:4000/userinfo/getrole/${checkIfLoggedUser}`)
                .then(res => {
                    setUserRole(res.data.Role.toString());
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            setUserRole("user");
        }
    }, [checkIfLoggedUser])

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
                    window.location.reload();
                    var temp = location.pathname;
                    temp = temp.split("/");
                    navigate(`/trangchapter/${temp[2]}`);
                })
                .catch(err => {
                    alert(err);
                });
        }
    }
    return (
        <div style={{ display: "inline-block"}}>
            {
                (userrole && userrole === "admin") ?
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
                    </div>:
                    <div style={{ display: "inline-block" }}></div> 
            }
        </div>
    )
}

export default InsertChapter