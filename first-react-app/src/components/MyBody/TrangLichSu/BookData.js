import React, { useEffect, useState } from 'react'
import axios from 'axios';

function BookData(bookid) {
    const [databook, setDataBook] = useState('');
    useEffect(() => {
        axios.put(`http://localhost:4000/add/singlebook/${bookid.bookid}`)
        .then(res =>{
            console.log(res.data);
            setDataBook(res.data);
        })
    }, [bookid])
    return (
        <div>
            {
                databook?
                databook.TenSach:
                "Error"
            }
        </div>
    )
}

export default BookData