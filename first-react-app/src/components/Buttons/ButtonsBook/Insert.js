import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

function Insert() {
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
  return (
    <div>
      {
        (userrole && userrole === "admin") ?
          <button><Link to='/trangthemsach'> + </Link></button>
          :
          <div style={{marginTop:"20px"}}></div>
      }
    </div>
  )
}

export default Insert