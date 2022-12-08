import UpgradeIcon from '@mui/icons-material/Upgrade';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import axios from 'axios';
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

function UpdateAuthor(author) {
    const [tacgia, setTacGia] = useState("");
    const [mota, setMoTa] = useState("");
    const [updatestate, setUpdateState] = useState(true);

    const navigate = useNavigate();

    function UpdateTacGia() {
        if (tacgia === "") {
            alert("Vui lòng nhập tác giả");
            return;
        }
        else {
            const Author = {
                TenTacGia: tacgia,
                Mota: mota
            }
            axios
                .put(`http://localhost:4000/add/updateauthor/${author.author.bookid}/${author.author.authorid}`, Author)
                .then(() => {
                    alert("cập nhật thành công");
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
        <div style={{ display: "inline", padding: "2px", alignItems: "center" }}>
            {updatestate ?
                <UpgradeIcon style={{ cursor: "pointer" }} onClick={() => setUpdateState(false)}></UpgradeIcon>
                :
                <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "5px" }}>
                    <RemoveCircleOutlineIcon style={{ backgroundColor: "red", cursor: "pointer" }} onClick={() => setUpdateState(true)}></RemoveCircleOutlineIcon>

                    <input onChange={e => setTacGia(e.target.value)} style={{ margin: "5px 0px", padding: "5px", width: "100%" }} type="text" placeholder="Nhập tên tác giả"></input>
                    <textarea value={mota ?? ""} style={{ width: "100%" }} onChange={e => setMoTa(e.target.value)}> </textarea>

                    <CheckCircleIcon onClick={UpdateTacGia} style={{ margin: "3px", cursor: "pointer" }}></CheckCircleIcon>
                </div>
            }
        </div>
    )
}

export default UpdateAuthor