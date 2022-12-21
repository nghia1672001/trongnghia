import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios';

function Update(bookid) {
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
        <div style={{display:"inline"}}>
            {
                (userrole && userrole==="admin")?
                <button><Link to='/trangupdate' state={bookid}>Update</Link></button>
                : <div style={{display:"inline"}}></div>
            }
        </div>
    )
}

export default Update