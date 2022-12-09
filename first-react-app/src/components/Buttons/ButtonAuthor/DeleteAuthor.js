import React from 'react'

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';

import { useLocation, useNavigate } from 'react-router-dom';

function DeleteAuthor(author) {
  const navigate = useNavigate();

  const location = useLocation();

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
    <RemoveCircleOutlineIcon style={{ display: "inline-block", cursor: "pointer" }} onClick={XoaAuthor}></RemoveCircleOutlineIcon>
  )
}

export default DeleteAuthor