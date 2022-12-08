import axios from 'axios'
import React from 'react'

function Delete(bookid) {
    function Xoa() {
        axios
        .delete(`http://localhost:4000/add/${bookid.bookid}`)
        .then(res => {
            alert(res.data)
            window.location.reload();
        })
        .catch(err => {
          console.log(err);
        }); 
    }
  return (
    <button onClick={Xoa}>-</button>
  )
}

export default Delete