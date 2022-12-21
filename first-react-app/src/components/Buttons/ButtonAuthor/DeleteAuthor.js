import React, { useState, useEffect } from 'react'

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';

import { useLocation, useNavigate } from 'react-router-dom';

function DeleteAuthor(author) {
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

  function XoaAuthor() {
    axios
      .put(`http://localhost:4000/add/deleteauthor/${author.author.bookid}/${author.author.authorid}`)
      .then(() => {
        alert("xóa thành công");
        window.location.reload();
        var temp = location.pathname;
        temp = temp.split("/");
        navigate(`/trangchapter/${temp[2]}`);
      })
      .catch(err => {
        alert(err);
      });
  }
  return (
    <div style={{ display: "inline-block"}}>
      {
        (userrole && userrole==="admin")?
        <RemoveCircleOutlineIcon style={{ display: "inline-block", cursor: "pointer" }} onClick={XoaAuthor}></RemoveCircleOutlineIcon>
        :
        <div style={{ display: "inline-block" }}></div>
      }
    </div>
  )
}

export default DeleteAuthor