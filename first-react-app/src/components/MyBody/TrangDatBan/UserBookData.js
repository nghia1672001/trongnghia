import React, { useEffect, useState } from 'react'
import axios from 'axios';


function BookUserData(userid) {
    const [userdata, setUserData] = useState('');
    useEffect(() => {
        axios.get(`http://localhost:4000/userinfo/showname/${userid.userid}`)
            .then(res => {
                setUserData(res.data);
            })
    }, [userid])
    return (
        <div style={{display:"block"}}>Tên người mượn:
            <div style={{ display: "inline", paddingLeft:"3px" }}>
                {
                    userdata ?
                        userdata.UserName :
                        "Error"
                }
            </div>
        </div>
    )
}

export default BookUserData