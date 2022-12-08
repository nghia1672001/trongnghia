import React from 'react'
import { Link } from 'react-router-dom'

function Update(bookid) {
    return (
        <button><Link to='/trangupdate' state={bookid}>Update</Link></button>
    )
}

export default Update