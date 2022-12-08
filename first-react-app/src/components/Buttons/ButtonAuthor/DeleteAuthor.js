import React from 'react'

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function DeleteAuthor(author) {
  const navigate = useNavigate();

  function XoaAuthor() {
    axios
      .put(`http://localhost:4000/add/deleteauthor/${author.author.bookid}/${author.author.authorid}`)
      .then(() => {
        alert("xóa thành công");
        const currentbookid = localStorage.getItem("currentbook");
        navigate(`/trangchapter/${currentbookid.slice(0, 7)}`);
        window.location.reload();
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