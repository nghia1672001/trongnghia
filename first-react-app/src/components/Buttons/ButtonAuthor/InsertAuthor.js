import React, { useState, useEffect } from 'react'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import axios from 'axios';

import { useLocation, useNavigate } from 'react-router-dom';

function InsertAuthor(bookid) {
  const [tacgia, setTacGia] = useState("");
  const [mota, setMoTa] = useState("");

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

  function onAddPress() {
    document.getElementById("tacgiaaddbtn").style.display = "none";
    document.getElementById("tacgiarmbtn").style.display = "block";
    document.getElementById("tacgiainput").style.display = "block";
    document.getElementById("tacgiacheckbtn").style.display = "block";
    document.getElementById("tacgiamota").style.display = "block";
  }

  function onRemovePress() {
    document.getElementById("tacgiainput").style.display = "none";
    document.getElementById("tacgiarmbtn").style.display = "none";
    document.getElementById("tacgiaaddbtn").style.display = "block";
    document.getElementById("tacgiacheckbtn").style.display = "none";
    document.getElementById("tacgiamota").style.display = "none";
  }

  function onConfirmPress() {
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
        .post(`http://localhost:4000/add/addauthor/${bookid.bookid}`, Author)
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
    <div>
      {
        (userrole && userrole === "admin") ?
          <div style={{ display: "inline-block", padding: "10px", alignItems: "center" }}>
            <ControlPointIcon style={{ display: "inline-block", cursor: "pointer" }} id="tacgiaaddbtn" onClick={onAddPress}></ControlPointIcon>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "5px" }}>
              <RemoveCircleOutlineIcon style={{ display: "none", cursor: "pointer" }} id="tacgiarmbtn" onClick={onRemovePress}></RemoveCircleOutlineIcon>

              <input onChange={e => setTacGia(e.target.value)} style={{ margin: "5px 0px", display: "none", padding: "5px", width: "100%" }} id="tacgiainput" type="text" placeholder="Nhập tên tác giả"></input>
              <textarea value={mota ?? ""} style={{ display: "none", width: "100%" }} id="tacgiamota" onChange={e => setMoTa(e.target.value)}> </textarea>

              <CheckCircleIcon onClick={onConfirmPress} id="tacgiacheckbtn" style={{ display: "none", margin: "3px", cursor: "pointer" }}></CheckCircleIcon>
            </div>
          </div> :
          <div></div>
      }
    </div>
  )
}

export default InsertAuthor