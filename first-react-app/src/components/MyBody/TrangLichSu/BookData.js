import React, { useEffect, useState } from 'react'
import axios from 'axios';

function BookData(bookid) {
    const [databook, setDataBook] = useState('');
    useEffect(() => {
        axios.put(`http://localhost:4000/add/singlebook/${bookid.bookid}`)
            .then(res => {
                setDataBook(res.data);
            })
    }, [bookid])
    return (
        <div style={{ display: "block" }}>Tên sách:
            <div style={{ display: "inline", paddingLeft: "3px" }}>
                {
                    databook ?
                        databook.TenSach :
                        "Error"
                }
            </div>
        </div>
    )
}

export default BookData