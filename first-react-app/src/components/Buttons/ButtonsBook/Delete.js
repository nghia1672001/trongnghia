import axios from 'axios'

import React, { useState, useEffect } from 'react'
function Delete(bookid) {
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
    <div style={{display:"inline"}}>
      {
        (userrole && userrole === "admin") ?
          <button onClick={Xoa}>-</button>
          : <div style={{display:"inline"}} ></div>
      }
    </div>
  )
}

export default Delete