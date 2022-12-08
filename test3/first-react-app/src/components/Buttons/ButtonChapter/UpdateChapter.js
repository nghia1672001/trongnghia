import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import axios from 'axios';
import React, { useState } from 'react';

function UpdateChapter(chap) {
    const [chapter, setChapter] = useState("");
    const [mota, setMoTa] = useState("");
    const [updatestate, setUpdateState] = useState(true);

    function UpdateChap() {
        if (chapter === "") {
            alert("Vui lòng nhập tên chương");
            return;
        }
        else {
            const Chapter = {
                ChapterTitle: chapter,
                ChapterContent: mota
            }
            axios
                .put(`http://localhost:4000/add/updatechapter/${chap.chap.bookid}/${chap.chap.chapterid}`, Chapter)
                .then(() => {
                    alert("cập nhật thành công")
                    window.location.reload();
                })
                .catch(err => {
                    alert(err);
                });
        }
    }
    return (
        <div style={{ display: "inline", padding: "2px", alignItems: "center" }}>
            {updatestate ?
                <TipsAndUpdatesIcon style={{cursor: "pointer"}} onClick={() => setUpdateState(false)}></TipsAndUpdatesIcon>
                :
                <div style={{display: "flex", flexDirection: "column", alignItems: "start",marginLeft: "5px"}}>
                    <RemoveCircleOutlineIcon style={{ backgroundColor: "red", cursor: "pointer" }} onClick={() => setUpdateState(true)}></RemoveCircleOutlineIcon>

                    <input onChange={e => setChapter(e.target.value)} style={{ margin: "5px 0px", padding: "5px", width: "100%" }} type="text" placeholder="Nhập tên chương"></input>
                    <textarea value={mota ?? ""} style={{ width: "100%" }} onChange={e => setMoTa(e.target.value)}> </textarea>

                    <CheckCircleIcon onClick={UpdateChap} style={{ margin: "3px", cursor: "pointer" }}></CheckCircleIcon>
                </div>
            }
        </div>
    )
}

export default UpdateChapter