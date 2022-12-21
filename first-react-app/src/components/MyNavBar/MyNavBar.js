import React, { useState, useEffect } from 'react'

import axios from 'axios';

import Dropdown from 'react-bootstrap/Dropdown';
import Image from "react-bootstrap/Image";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import MediaQuery from 'react-responsive'

import { Link } from 'react-router-dom';

import SearchBar from '../functionality/SearchBar/SearchBar';
import LoginButton from '../Buttons/LoginButton/LoginButton';
import './MyNavBar.css';
import ColorSwitches from '../functionality/PageModeToggle/PageModeToggle';

function MyNavBar({theme, onTogglePress}) {
    const [dDMStatus, setDDMStatus] = useState('drop-down-menu-hidden');
    const [dDMLabelStatus, setDDMLabelStatus] = useState('nav-drop-down-hidden');

    const [userImage, setUserImage] = useState('');
    const checkIfLoggedUser = localStorage.getItem('user');

    useEffect(() => {
        if (checkIfLoggedUser) {
            axios.get(`http://localhost:4000/userinfo/showanh/${checkIfLoggedUser}`)
                .then(res => {
                    setUserImage(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else{
            setUserImage('');
        }
    }, [checkIfLoggedUser])

    return (
        <div>
            <MediaQuery minWidth={992}>
                <Navbar bg="navcuatan" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand style={{ color: "darkblue" }} href="/">Trang chủ</Navbar.Brand>
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-false`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-false`}
                            placement="end"
                            show={false}
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                                    Sidebar
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="m-auto">
                                    <div className='nav-links'>
                                        <div className="nav-links-items">
                                            <Link to="/trang1" className='nav-mau-chu'>Trang Mot</Link>
                                        </div>
                                        <div className="nav-links-items">
                                            <div
                                                onMouseLeave={() => {
                                                    setDDMStatus('drop-down-menu-hidden');
                                                    setDDMLabelStatus('nav-drop-down-hidden');
                                                }}
                                                onMouseEnter={() => {
                                                    setDDMStatus('drop-down-menu');
                                                    setDDMLabelStatus('nav-drop-down');
                                                }}
                                                className={dDMLabelStatus}>
                                                <Link to="/trang3" className='nav-mau-chu'>Thể Loại</Link>
                                                <div className={dDMStatus}>
                                                    a
                                                </div>
                                            </div>
                                        </div>
                                        <div className="nav-links-items">
                                            <Link to="/trang2" className='nav-mau-chu'>Lịch sử</Link>
                                        </div>
                                    </div>
                                </Nav>
                                <SearchBar />
                                <ColorSwitches theme={theme} onTogglePress={onTogglePress}/>
                                {
                                    checkIfLoggedUser != null ?
                                        <Nav.Item className="m-auto ">
                                            <Dropdown>
                                                <Dropdown.Toggle variant="outline" id="dropdown-basic">
                                                    <Image
                                                        className='nav-user-image'
                                                        src={userImage.Image}
                                                        roundedCircle
                                                    />
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="/trangbon">Sửa thông tin cá nhân</Dropdown.Item>
                                                    <Dropdown.Item onClick={
                                                        () => {
                                                            localStorage.removeItem('user');
                                                            window.location.reload();
                                                        }}>Logout</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Nav.Item>

                                        : <Nav.Item className="m-auto">
                                            <LoginButton />
                                        </Nav.Item>

                                }
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            </MediaQuery>
            <MediaQuery maxWidth={991}>
                <Navbar bg="navcuatan" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand style={{ color: "navy" }} href="/">Trang chủ</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-false`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-false`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                                    Sidebar
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="m-auto">
                                    <div className='nav-links'>
                                        <div className="nav-links-items">
                                            <Link to="/trang1" className='nav-mau-chu'>Thêm Sách</Link>
                                        </div>
                                        <div className="nav-links-items">
                                            <div
                                                onMouseLeave={() => {
                                                    setDDMStatus('drop-down-menu-hidden');
                                                    setDDMLabelStatus('nav-drop-down-hidden');
                                                }}
                                                onMouseEnter={() => {
                                                    setDDMStatus('drop-down-menu');
                                                    setDDMLabelStatus('nav-drop-down');
                                                }}
                                                className={dDMLabelStatus}>
                                                <Link
                                                    to="/trang3"
                                                    className='nav-mau-chu'>Thể loại</Link>
                                                <div className={dDMStatus}>
                                                    a
                                                </div>
                                            </div>
                                        </div>
                                        <div className="nav-links-items">
                                            <Link to="/trang2" className='nav-mau-chu'>Lịch sử</Link>
                                        </div>
                                    </div>
                                </Nav>
                                <SearchBar />
                                {
                                    checkIfLoggedUser != null ?
                                        <Nav.Item className="m-auto nav-image-margin">
                                            <Dropdown>
                                                <Dropdown.Toggle variant="outline" id="dropdown-basic">
                                                    <Image
                                                        className='nav-user-image'
                                                        src={userImage.Image}
                                                        roundedCircle
                                                    />
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="/trangbon">Sửa thông tin cá nhân</Dropdown.Item>
                                                    <Dropdown.Item onClick={
                                                        () => {
                                                            localStorage.removeItem('user');
                                                            window.location.reload();
                                                        }}>Logout</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Nav.Item>
                                        : <Nav.Item className="m-auto">
                                            <LoginButton />
                                        </Nav.Item>
                                }
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            </MediaQuery>
        </div>
    )
}

export default MyNavBar