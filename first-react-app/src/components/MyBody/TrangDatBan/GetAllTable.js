import axios from 'axios';
import React, { useEffect, useState } from 'react'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BookUserData from './UserBookData';

function GetAllTable() {
    const [thongbaodatban, setThongBaoDatBan] = useState('');
    useEffect(() => {
        axios.get(`http://localhost:4000/booktable/table`)
            .then((res) => {
                setThongBaoDatBan(res.data);
            })
            .catch(err => {
                alert(err);
            });
    }, [thongbaodatban]);

    function ConfirmBookTable(userid, xuliid) {
        axios.put(`http://localhost:4000/booktable/confirmbooktable/${userid}/${xuliid}`)
            .then(() => {
                alert("Đã cho mượn bàn thành công");
                window.location.reload();
            })
            .catch(err => {
                alert(err);
            })
    }

    function GiveBackTable(userid, xuliid) {
        axios.put(`http://localhost:4000/booktable/confirm/${userid}/${xuliid}`)
            .then(() => {
                alert("Đã trả bàn thành công");
                window.location.reload();
            })
            .catch(err => {
                alert(err);
            })
    }
    return (
        <div>
            {
                thongbaodatban ?
                    thongbaodatban.map((a, key) => {
                        return <div key={key} style={{ margin: "10px", border: "1px solid black" }}>
                            <p>Ngày thuê: {a.NgayThue.split('T')[0]}</p>
                            <p>Số bàn: {a.SoBan}</p>
                            <BookUserData userid={a.NguoiMuon} />
                            {
                                a.TinhTrang ?
                                    a.TinhTrang === 1 ? "Da tra" :
                                        a.TinhTrang === 2 ? "Chua tra" :
                                            "Dang xu li" :
                                    "Error"
                            }
                            {
                                a.TinhTrang === 3 ?
                                    <p>
                                        <CheckCircleIcon onClick={() => ConfirmBookTable(a.NguoiMuon, a._id)} ></CheckCircleIcon>
                                    </p>
                                    :
                                    <p></p>
                            }
                            {
                                a.TinhTrang === 2 ?
                                    <p>
                                        <button style={{ backgroundColor: "yellowgreen", borderRadius: "3px", border: "none" }} onClick={() => GiveBackTable(a.NguoiMuon, a._id)}>Trả bàn</button>
                                    </p> :
                                    <p></p>
                            }
                        </div>
                    })
                    : <div> Error</div>
            }
        </div>
    )
}

export default GetAllTable