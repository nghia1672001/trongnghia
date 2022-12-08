import React from 'react'

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';
function DeleteAuthor(author) {
  function XoaAuthor() {
    axios
      .put(`http://localhost:4000/add/deleteauthor/${author.author.bookid}/${author.author.authorid}`)
      .then(() => {
        alert("xóa thành công")
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