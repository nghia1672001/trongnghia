import React, { useEffect, useState } from 'react'

import axios from 'axios';

function CommentBlock(binhluanid) {
    const [comment, setComment] = useState("");
    useEffect(() => {
        axios.put(`http://localhost:4000/comment/usercommentinfo/${binhluanid.binhluanid}`)
            .then(res => {
                setComment(res.data);
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <div>
            <img src={comment.data.userimage} alt="" />
            <h4>{comment.data.username}</h4>
        </div>
    )
}

export default CommentBlock