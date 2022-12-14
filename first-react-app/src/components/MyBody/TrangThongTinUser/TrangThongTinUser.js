import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';

import UserPassword from '../../functionality/userinformodify/userchangepassword/UserPassword'
import UserImage from '../../functionality/userinformodify/userimagemodify/UserImage'
import BookData from '../TrangLichSu/BookData'
import UserData from './UserData';

import axios from 'axios';
import { useLocation } from 'react-router-dom';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function TrangThongTinUser() {
  const [thongbaomuonsach, setThongBaoMuonSach] = useState('');

  const location = useLocation();
  console.log(location);
  const checkIfLoggedUser = localStorage.getItem('user');
  useEffect(() => {
    if (checkIfLoggedUser) {
      axios.get(`http://localhost:4000/borrow/getxuli`)
        .then((res) => {
          setThongBaoMuonSach(res.data);
        })
        .catch(err => {
          alert(err);
        });
    }
    else {
      setThongBaoMuonSach('');
    }
  }, [checkIfLoggedUser]);

  function ConfirmBorrowBook(xuliid, userid) {
    axios.put(`http://localhost:4000/borrow/confirmborrow/${xuliid}/${userid}`)
      .then(() => {
        alert("Da xac nhan cho muon sach thanh cong");
        window.location.reload();
      })
      .catch(err => {
        alert(err);
      })
  }

  function GiveBackBook(xuliid, userid) {
    axios.put(`http://localhost:4000/borrow/confirm/${xuliid}/${userid}`)
      .then(() => {
        alert("Đã trả sách thành công");
        window.location.reload();
      })
      .catch(err => {
        alert(err);
      })
  }
  return (
    <Container>
      <UserImage />
      <UserPassword />

      {
        location.state ?
          <div>
            <h3> Thong tin muon sach </h3>
            {
              thongbaomuonsach ?
                thongbaomuonsach.map((a, key) => {
                  return <div key={key} style={{ alignItems: "center", justifyContent: "space-between", display: "flex", margin: "10px", border: "1px solid black" }}>
                    <div style={{ marginLeft: "5%" }}>
                      <p>Ngày mượn: {a.NgayMuon.split('T')[0]}</p>
                      <p>Ngày trả: {a.NgayTra.split('T')[0]}</p>
                      <BookData bookid={a.Sach} />
                      <p style={{ marginBottom: "13px" }}></p>
                      <UserData userid={a.User} />
                      <p style={{ margin: "13px" }}></p>
                      {
                        a.TinhTrang ?
                          a.TinhTrang === 1 ? <span style={{fontWeight:"bold"}}>Đã trả sách</span> :
                            a.TinhTrang === 2 ? "Chua tra" :
                              "Đang xử lí" :
                          "Error"
                      }
                      {
                        a.TinhTrang === 3 ?
                          <p>
                            <CheckCircleIcon onClick={() => ConfirmBorrowBook(a._id, a.User)} ></CheckCircleIcon>
                          </p>
                          :
                          <p></p>
                      }
                      {
                        a.TinhTrang === 2 ?
                          <p>
                            <button style={{ backgroundColor: "yellowgreen", borderRadius: "3px", border: "none" }} onClick={() => GiveBackBook(a._id, a.User)}>Trả sách</button>
                          </p> :
                          <p></p>
                      }
                    </div>
                    <div>
                      {
                        a.TinhTrang === 1 ?
                          <CheckCircleIcon style={{ fontSize: "10vw", color: "green", marginLeft: "5%" }}></CheckCircleIcon>
                          : a.TinhTrang === 2 ?
                            <RemoveCircleIcon style={{ fontSize: "10vw" }}></RemoveCircleIcon>
                            : a.TinhTrang === 3 ?
                              <MoreHorizIcon style={{ fontSize: "10vw", color: "orange" }}></MoreHorizIcon>
                              : <p></p>
                      }
                    </div>
                  </div>
                })
                : <div> Error</div>
            }
          </div> :
          ""
      }

    </Container>
  )
}

export default TrangThongTinUser