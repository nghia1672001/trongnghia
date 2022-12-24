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
    var a = "";
    a = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
    const navigate = useNavigate();
    const location = useLocation();
    function BorrowBook() {
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
    return (
        <Container style={{ margin: "20px auto" }}>
            <Row className='justify-content-center'>
                <Col xs={1}>
                    <div className='datepicker-position'>
                        <DatePicker
                            startDate={ngaymuon}
                            endDate={ngaytra}
                            selectsStart
                            className='datepicker-form'
                            calendarClassName='calendar'
                            selected={ngaymuon}
                            onChange={(date) => setNgayMuon(date)} />
                        <DatePicker
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