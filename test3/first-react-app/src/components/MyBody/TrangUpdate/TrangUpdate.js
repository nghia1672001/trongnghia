import React from 'react'
import UpdateBook from '../../functionality/BookCRUD/UpdateBook'
import { useLocation } from 'react-router-dom'

function TrangUpdate() {
    const location = useLocation();
    console.log("test", location)

    return (
        <div className="functinality">
            <UpdateBook id={location.state.bookid} />
        </div>
    )
}

export default TrangUpdate