import React, { useState, useEffect, useRef } from 'react'

import axios from 'axios';

import Dropdown from 'react-bootstrap/Dropdown';
import Image from "react-bootstrap/Image";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import MediaQuery from 'react-responsive'

import { Link, useNavigate } from 'react-router-dom';

import SearchBar from '../functionality/SearchBar/SearchBar';
import LoginButton from '../Buttons/LoginButton/LoginButton';
import './MyNavBar.css';
import ColorSwitches from '../functionality/PageModeToggle/PageModeToggle';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Button } from 'react-bootstrap';

function MyNavBar({ theme, onTogglePress, setBooks }) {
    const [dDMStatus, setDDMStatus] = useState('drop-down-menu-hidden');
    const [dDMLabelStatus, setDDMLabelStatus] = useState('nav-drop-down-hidden');

    const [showbtntext, setShowBtnText] = useState(false);

    const [userImage, setUserImage] = useState('');
    const [isadminrole, setAdminRole] = useState(false);
    const [getmessage, setGetMessage] = useState('');

    const [searchResult, setSearchResult] = useState('');

    const OffcanvasRef = useRef();
    const closeOffCanvas = () => OffcanvasRef.current.backdrop.click();

    const navigate = useNavigate();
    const checkIfLoggedUser = localStorage.getItem('user');


    useEffect(() => {
        if (checkIfLoggedUser) {
            axios.get(`http://localhost:4000/userinfo/showanh/${checkIfLoggedUser}`)
                .then(res => {
                    setUserImage(res.data);
                    setGetMessage(res.data.Message);
                    console.log(res.data);
                    if (res.data.Role.toString() === "admin") {
                        setAdminRole(true);
                    }
                    else {
                        setAdminRole(false);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            setUserImage('');
            setAdminRole(false);
            setGetMessage('');
        }
    }, [checkIfLoggedUser])

    function UserReadMessage(messageid, isadmin) {
        axios.put(`http://localhost:4000/borrow/confirmseen/${checkIfLoggedUser}/${messageid}`)
            .then(() => {
                if (isadmin) {
                    navigate('/trangthongtinuser', { state: isadmin })
                }
                else {
                    navigate('/tranglichsu')
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div>
            <MediaQuery minWidth={992}>
                <Navbar bg="navcuatan" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand style={{ color: "darkblue" }} href="/">Trang chủ</Navbar.Brand>
                        <Navbar.Offcanvas
                            ref={OffcanvasRef}
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
                                            <Link to="/trangDatBan" className='nav-mau-chu'>Đặt bàn</Link>
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
                                            <Link to="/tranglichsu" className='nav-mau-chu'>Lịch sử</Link>
                                        </div>
                                    </div>
                                </Nav>
                                {
                                    checkIfLoggedUser != null ?
                                        <Nav.Item className="m-auto nav-image-margin">
                                            <Dropdown>
                                                <Dropdown.Toggle variant="outline" id="dropdown-basic">
                                                    <NotificationsActiveIcon style={{ height: "40px", fontSize: "30px" }} ></NotificationsActiveIcon>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu bsPrefix='dropdown-menu drop-down-menu-center'>
                                                    {
                                                        getmessage ?
                                                            getmessage.map((a, i = 0) => {
                                                                i++;
                                                                if (i < 10) {
                                                                    if (a.Seen) {
                                                                        return <Dropdown.Item key={i} as={Link} state={isadminrole} to='/trangthongtinuser'>{a.Noidung}</Dropdown.Item>
                                                                    }
                                                                    else {
                                                                        return <Dropdown.Item key={i} onClick={() => UserReadMessage(a._id, isadminrole)}  ><span style={{ color: "red" }}>{a.Noidung}</span></Dropdown.Item>
                                                                    }
                                                                }
                                                                else {
                                                                    if (a.Seen) {
                                                                        return <Dropdown.Item key={i} bsPrefix={showbtntext ? "dropdown-item" : "nav-dd-hide"} as={Link} state={isadminrole} to='/trangthongtinuser'>{a.Noidung}</Dropdown.Item>
                                                                    }
                                                                    else {
                                                                        return <Dropdown.Item key={i} bsPrefix={showbtntext ? "dropdown-item" : "nav-dd-hide"} onClick={() => UserReadMessage(a._id, isadminrole)}  ><span style={{ color: "red" }}>{a.Noidung}</span></Dropdown.Item>
                                                                    }

                                                                }

                                                            })
                                                            : <Dropdown.Item>Khong co thong bao</Dropdown.Item>
                                                    }
                                                    {
                                                        getmessage.length >= 10 ?
                                                            <Button style={{ marginLeft: "100px" }} onClick={() => {
                                                                if (showbtntext) {
                                                                    setShowBtnText(false);
                                                                }
                                                                else {
                                                                    setShowBtnText(true);
                                                                }
                                                            }}>{showbtntext ? "Show less" : "Show more"}</Button> :
                                                            <div></div>
                                                    }
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Nav.Item>
                                        : <Nav.Item></Nav.Item>
                                }
                                <SearchBar setSearchResult={setSearchResult} searchResult={searchResult} setBooks={setBooks} />
                                <ColorSwitches theme={theme} onTogglePress={onTogglePress} />
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
                                                    <Dropdown.Item as={Link} state={isadminrole} to="/trangthongtinuser">
                                                        Sửa thông tin cá nhân
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={
                                                        () => {
                                                            localStorage.removeItem('user');
                                                            window.location.reload();
                                                            navigate('/');
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
                            ref={OffcanvasRef}
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
                                            <Link to="/trangdatban" className='nav-mau-chu'>Đặt bàn</Link>
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
                                            <Link to="/tranglichsu" className='nav-mau-chu'>Lịch sử</Link>
                                        </div>
                                    </div>
                                </Nav>
                                {
                                    checkIfLoggedUser != null ?
                                        <Nav.Item className="m-auto nav-image-margin">
                                            <Dropdown>
                                                <Dropdown.Toggle variant="outline" id="dropdown-basic">
                                                    <NotificationsActiveIcon style={{ height: "40px", fontSize: "30px" }} ></NotificationsActiveIcon>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu bsPrefix='dropdown-menu drop-down-menu-center'>
                                                    {
                                                        getmessage ?
                                                            getmessage.map((a, i = 0) => {
                                                                i++;
                                                                if (i < 10) {
                                                                    if (a.Seen) {
                                                                        return <Dropdown.Item key={i} as={Link} state={isadminrole} to='/trangthongtinuser'>{a.Noidung}</Dropdown.Item>
                                                                    }
                                                                    else {
                                                                        return <Dropdown.Item key={i} onClick={() => UserReadMessage(a._id, isadminrole)}  ><span style={{ color: "red" }}>{a.Noidung}</span></Dropdown.Item>
                                                                    }
                                                                }
                                                                else {
                                                                    if (a.Seen) {
                                                                        return <Dropdown.Item key={i} bsPrefix={showbtntext ? "dropdown-item" : "nav-dd-hide"} as={Link} state={isadminrole} to='/trangthongtinuser'>{a.Noidung}</Dropdown.Item>
                                                                    }
                                                                    else {
                                                                        return <Dropdown.Item key={i} bsPrefix={showbtntext ? "dropdown-item" : "nav-dd-hide"} onClick={() => UserReadMessage(a._id, isadminrole)}  ><span style={{ color: "red" }}>{a.Noidung}</span></Dropdown.Item>
                                                                    }

                                                                }

                                                            })
                                                            : <Dropdown.Item>Khong co thong bao</Dropdown.Item>
                                                    }
                                                    {
                                                        getmessage.length >= 10 ?
                                                            <Button style={{ marginLeft: "180px" }} onClick={() => {
                                                                if (showbtntext) {
                                                                    setShowBtnText(false);
                                                                }
                                                                else {
                                                                    setShowBtnText(true);
                                                                }
                                                            }}>{showbtntext ? "Show less" : "Show more"}</Button> :
                                                            <div></div>
                                                    }
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Nav.Item>
                                        : <Nav.Item></Nav.Item>
                                }
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
                                                    <Dropdown.Item as={Link} onClick={closeOffCanvas} state={isadminrole} to="/trangthongtinuser">
                                                        Sửa thông tin cá nhân
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={
                                                        () => {
                                                            localStorage.removeItem('user');
                                                            window.location.reload();
                                                            navigate('/');
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