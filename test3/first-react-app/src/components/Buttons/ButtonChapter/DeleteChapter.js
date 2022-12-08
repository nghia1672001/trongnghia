import React from 'react'

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';
function DeleteChapter(page) {
    function XoaChapter() {
        axios
        .put(`http://localhost:4000/add/deletechapter/${page.page.bookid}/${page.page.chapterid}`)
        .then(() => {
          alert("xóa thành công")
          window.location.reload();
        })
        .catch(err => {
          alert(err);
        });
      }
      return (
        <RemoveCircleOutlineIcon style={{ display: "inline-block", cursor: "pointer" }} onClick={XoaChapter}></RemoveCircleOutlineIcon>
      )
}

export default DeleteChapter