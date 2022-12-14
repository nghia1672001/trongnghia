import React, { useEffect, useState } from 'react'

import axios from 'axios';

import './CommentBlock.css'

function CommentBlock(binhluanstate) {
    const [commentuimg, setCommentUImg] = useState("");
    const [commentuname, setCommentUName] = useState("");
    useEffect(() => {
        axios.put(`http://localhost:4000/comment/usercommentinfo/${binhluanstate.binhluanstate.binhluanid}`)
            .then(res => {
                setCommentUImg(res.data.userimage);
                setCommentUName(res.data.username);
            })
            .catch(err => console.log(err));
    }, [binhluanstate]);
    return (
        <div className='comment-user-info-container'>
            <div className='comment-user-info'>
                <div className='comment-circle-avt'>
                    <img src={commentuimg} alt="" />
                </div>
                <h4>{commentuname}</h4>
            </div>
            <p>{binhluanstate.binhluanstate.noidung}</p>
        </div>
    )
}

export default CommentBlock