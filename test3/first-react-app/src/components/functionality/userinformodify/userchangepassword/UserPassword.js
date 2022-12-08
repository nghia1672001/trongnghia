import React, { useRef, useState } from 'react'

import { useNavigate } from 'react-router-dom';

import axios from 'axios';
function UserPassword() {
    const [MatKhau, setMatKhau] = useState("");
    const uploadBtn = useRef();

    const upass = useRef();

    const navigate = useNavigate();
    function handleUpload() {
        if (MatKhau === "") {
            alert("Vui lòng điền mật khẩu mới!")
            return;
        }
    uploadBtn.current.setAttribute("disabled", "disabled");
    const checkIfLoggedUser = localStorage.getItem('user');

    if (checkIfLoggedUser != null) {
        const userinfo = {
            MatKhau: MatKhau,
        };
        axios.post(`http://localhost:4000/changepass/doimatkhau/${checkIfLoggedUser}`, userinfo)
            .then(res => {
                alert(res.data);
                navigate('/trang1');

                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    }
    else {
        alert("Fatal Error!!");
    }
    }
    return (
        <div>
        <input ref={upass} type="password" onChange={(e) => setMatKhau(e.target.value)} />
        <button style={{margin: "20px", borderRadius: "10px"}} ref={uploadBtn} onClick={handleUpload}>Đổi mật khẩu</button>
    </div>
    )
}

export default UserPassword