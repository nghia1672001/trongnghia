import React, { useEffect, useState } from 'react'
import axios from 'axios';


function UserData(userid) {
    const [userdata, setUserData] = useState('');
    useEffect(() => {
        axios.get(`http://localhost:4000/userinfo/showname/${userid.userid}`)
        .then(res =>{
            console.log(res.data);
            setUserData(res.data);
        })
    }, [userid])
    return (
        <div>
            {
                userdata?
                userdata.UserName:
                "Error"
            }
        </div>
    )
}

export default UserData