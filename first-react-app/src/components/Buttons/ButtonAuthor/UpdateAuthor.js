import UpgradeIcon from '@mui/icons-material/Upgrade';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

function UpdateAuthor(author) {
    const [tacgia, setTacGia] = useState("");
    const [mota, setMoTa] = useState("");
    const [updatestate, setUpdateState] = useState(true);

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
        <div style={{ display: "inline" }}>
            {
                (userrole && userrole === "admin") ?
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
                    </div> :
                    <div style={{ display: "inline" }}></div>
            }
        </div>
    )
}

export default UpdateAuthor