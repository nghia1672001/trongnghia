import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';

import UserPassword from '../../functionality/userinformodify/userchangepassword/UserPassword'
import UserImage from '../../functionality/userinformodify/userimagemodify/UserImage'
import BookData from '../TrangLichSu/BookData'
import UserData from './UserData';

import axios from 'axios';
import { useLocation } from 'react-router-dom';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function TrangThongTinUser() {
  const [thongbaomuonsach, setThongBaoMuonSach] = useState('');

  const location = useLocation();
  const checkIfLoggedUser = localStorage.getItem('user');
  useEffect(() => {
    if (checkIfLoggedUser) {
      axios.get(`http://localhost:4000/borrow/getxuli`)
        .then((res) => {
          console.log(res.data);
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
                  return <div key={key} style={{ margin: "10px", border: "1px solid black" }}>
                    <p>{a.NgayMuon.split('T')[0]}</p>
                    <p>{a.NgayTra.split('T')[0]}</p>
                    <BookData bookid={a.Sach} />
                    <UserData userid={a.User} />
                    {
                      a.TinhTrang ?
                        a.TinhTrang === 1 ? "Da tra" :
                          a.TinhTrang === 2 ? "Chua tra" :
                            "Dang xu li" :
                        "Error"
                    }
                    {
                      a.TinhTrang === 2 ?
                        <p></p>
                        :
                        <p>
                          <CheckCircleIcon onClick={() => ConfirmBorrowBook(a._id, a.User)} ></CheckCircleIcon>
                        </p>
                    }
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