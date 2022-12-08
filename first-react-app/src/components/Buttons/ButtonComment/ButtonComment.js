import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ButtonComment(bookid) {
    const [noidung, setNoidung] = useState("");
    const checkIfLoggedUser = localStorage.getItem('user');

    const navigate = useNavigate();

    function AddComment() {
        if (noidung === "") {
            alert("Vui lòng nhập nội dung");
            return;
        }
        else {
            const comment = {
                NoiDung: noidung
            }
            axios
                .post(`http://localhost:4000/comment/addcomment/${checkIfLoggedUser}/${bookid.bookid}`, comment)
                .then(() => {
                    alert("Comment thành công");
                    window.location.reload();
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
            <textarea value={noidung ?? ""} onChange={e => setNoidung(e.target.value)} style={{ width: "100%" }}></textarea>
            <br></br>
            <button onClick={AddComment}>Send</button>
        </div>
    )
}

export default ButtonComment