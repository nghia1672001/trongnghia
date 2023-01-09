import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';

import './TrangMuonSach.css';

function TrangMuonSach() {
    const [ngaymuon, setNgayMuon] = useState(new Date());
    const [ngaytra, setNgayTra] = useState(new Date());

    const checkIfLoggedUser = localStorage.getItem('user');

    const d = new Date();

    const navigate = useNavigate();
    const location = useLocation();

    //  (b > d) && (a < b)
    function IsValidDay(a, b) {
        var temp = a;
        temp = temp.toString().split(' ')[1] + temp.toString().split(' ')[2] + temp.toString().split(' ')[3];

        var temp1 = d;
        temp1 = temp1.toString().split(' ')[1] + temp1.toString().split(' ')[2] + temp1.toString().split(' ')[3];

        var temp2 = b;
        temp2 = temp2.toString().split(' ')[1] + temp2.toString().split(' ')[2] + temp2.toString().split(' ')[3];


        console.log(temp >= temp1 && temp2 > temp1 && temp2 > temp)
        if ((temp >= temp1) && (temp2 > temp1) && (temp2 > temp)) {
            return true;
        }
        else {
            return false;
        }
    }

    function IsRangeDay(a, b) {
        var temp = a;

        var temp2 = b;

        if ((Math.ceil((temp2 - temp) / (1000 * 60 * 60 * 24)) >= 1) && (Math.ceil((temp2 - temp) / (1000 * 60 * 60 * 24)) <= 14)) {
            return true;
        }
        else {
            return false;
        }
    }

    function BorrowBook() {
        if (IsValidDay(ngaymuon, ngaytra) && IsRangeDay(ngaymuon, ngaytra)) {
            const xuli = {
                NgayMuon: ngaymuon,
                NgayTra: ngaytra,
            }
            axios
                .post(`http://localhost:4000/borrow/borrowbook/${checkIfLoggedUser}/${location.state}`, xuli)
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
        <Container style={{ margin: "20px auto" }}>
            <Row className='justify-content-center'>
                <Col xs={1}>
                    <div className='datepicker-position'>
                        <DatePicker
                            dateFormat="yyyy/MM/dd"
                            startDate={ngaymuon}
                            endDate={ngaytra}
                            selectsStart
                            className='datepicker-form'
                            calendarClassName='calendar'
                            selected={ngaymuon}
                            onChange={(date) => setNgayMuon(date)} />
                        <DatePicker
                            dateFormat="yyyy/MM/dd"
                            selectsEnd
                            className='datepicker-form'
                            selected={ngaytra}
                            startDate={ngaymuon}
                            endDate={ngaytra}
                            minDate={ngaymuon}
                            onChange={(date) => setNgayTra(date)} />
                    </div>
                </Col>
            </Row>
            <Row>
                <button onClick={BorrowBook}>Muon sach</button>
            </Row>
        </Container>
    )
}

export default TrangMuonSach