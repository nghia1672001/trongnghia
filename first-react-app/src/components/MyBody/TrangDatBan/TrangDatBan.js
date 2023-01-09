import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import GetAllTable from './GetAllTable';

function TrangDatBan() {
  const [ngaymuon, setNgayMuon] = useState(new Date());
  const [soban, setSoBan] = useState('');

  const [userrole, setUserRole] = useState('noneuser');

  const checkIfLoggedUser = localStorage.getItem('user');

  const d = new Date();

  const navigate = useNavigate();


  useEffect(() => {
    if (checkIfLoggedUser) {
      axios.get(`http://localhost:4000/userinfo/getrole/${checkIfLoggedUser}`)
        .then(res => {
          setUserRole(res.data.Role.toString());
        })
        .catch(err => {
          console.log(err);
        });
    }
    else {
      setUserRole("user");
    }
  }, [checkIfLoggedUser])

  function IsValidDay(a) {
    var temp = a;
    temp = temp.toString().split(' ')[1] + temp.toString().split(' ')[2] + temp.toString().split(' ')[3];

    var temp1 = d;
    temp1 = temp1.toString().split(' ')[1] + temp1.toString().split(' ')[2] + temp1.toString().split(' ')[3];


    if ((temp >= temp1)) {
      return true;
    }
    else {
      return false;
    }
  }

  function BookTable() {
    if (IsValidDay(ngaymuon, d)) {
      const xuli = {
        NgayThue: ngaymuon,
        SoBan: soban
      }
      axios
        .post(`http://localhost:4000/booktable/booktableform/${checkIfLoggedUser}`, xuli)
        .then((res) => {
          alert(res.data);
          navigate(`/`);
        })
        .catch(err => {
          alert(err);
        });
    }
    else {
      alert("Moi nhap lai!");
    }

  }
  return (
    <div>
      {
        (userrole && userrole === "admin") ?
          <GetAllTable></GetAllTable>
          :
          <Container style={{ margin: "20px auto" }}>
            <Row className='justify-content-center'>
              <div className='datepicker-position'>
                <DatePicker
                  dateFormat="yyyy/MM/dd"
                  startDate={ngaymuon}
                  selectsStart
                  className='datepicker-form'
                  calendarClassName='calendar'
                  selected={ngaymuon}
                  onChange={(date) => setNgayMuon(date)} />
              </div>
            </Row>
            <Row>
              <input onChange={e => setSoBan(e.target.value)} style={{ margin: "5px 0px", padding: "5px", width: "100%" }} type="text" placeholder="Nhập số bàn"></input>
            </Row>
            <Row>
              <button onClick={BookTable}>Đặt bàn</button>
            </Row>
          </Container>
      }

    </div>
  )
}

export default TrangDatBan