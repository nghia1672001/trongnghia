import React from 'react'

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function DeleteChapter(page) {
  const navigate = useNavigate();

  function XoaChapter() {
    axios
      .put(`http://localhost:4000/add/deletechapter/${page.page.bookid}/${page.page.chapterid}`)
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
    <RemoveCircleOutlineIcon style={{ display: "inline-block", cursor: "pointer" }} onClick={XoaChapter}></RemoveCircleOutlineIcon>
  )
}

export default DeleteChapter