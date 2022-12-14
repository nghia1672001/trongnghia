import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router-dom';

import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PersonIcon from '@mui/icons-material/Person';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PlaceIcon from '@mui/icons-material/Place';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import './TrangChapter.css'
import InsertAuthor from '../../Buttons/ButtonAuthor/InsertAuthor';
import DeleteAuthor from '../../Buttons/ButtonAuthor/DeleteAuthor';
import InsertChapter from '../../Buttons/ButtonChapter/InsertChapter';
import DeleteChapter from '../../Buttons/ButtonChapter/DeleteChapter';
import UpdateAuthor from '../../Buttons/ButtonAuthor/UpdateAuthor';
import UpdateChapter from '../../Buttons/ButtonChapter/UpdateChapter';
import ButtonComment from '../../Buttons/ButtonComment/ButtonComment';

import CommentBlock from '../../functionality/CommentBlock/CommentBlock';
import axios from 'axios';
import InsertCategory from '../../Buttons/ButtonCategory.js/InsertCategory';

function TrangChapter() {
    const [loadingstate, setLoadingState] = useState("Loading data.... Please reload if it takes too long to response");
    const location = useLocation();

    const checkIfLoggedUser = localStorage.getItem('user');
    const navigate = useNavigate();
    console.log(location);

    function BorrowBookDeny() {
        if (window.confirm("Chuc nang nay can phai dang nhap!Ban co muon sang trang dang ki")) {
            navigate('/loginform');
        }
        else {
            alert("Ban phai dang nhap de su dung chuc nang");
        }
    }
    useEffect(() => {

        var temp = location.pathname;
        temp = temp.split("/");

        axios
            .put(`http://localhost:4000/add/singlebook/${temp[2]}`)
            .then(res => {
                location.state = res.data;
                setLoadingState("OK!");
            })
            .catch(err => console.log(err));

    }, [location]);

    return (
        <Container>
            {
                location.state ?
                    <Row className="justify-content-center">
                        <Col lg={9}>
                            <Row style={{ marginTop: "20px" }} className="justify-content-center">
                                <h1 style={{ textAlign: "center" }}>{location.state.TenSach}</h1>
                            </Row>
                            <Row className="justify-content-center">
                                <Col className='chapter-item'>
                                    <img src={location.state.BookImage} alt="" />
                                </Col>
                                <Col xs={8}>
                                    <div>
                                        <div style={{ display: "block" }}>
                                            <PersonIcon style={{ height: "22px", marginRight: "10px", marginBottom: "2px" }}></PersonIcon>
                                            T??c gi???: {location.state.TacGia.length > 0 ? location.state.TacGia.map((tacgia, key) => {
                                                if (key === location.state.TacGia.length - 1) {
                                                    return <div style={{ display: "inline" }} key={key}>
                                                        {tacgia.TenTacGia}
                                                        <DeleteAuthor author={{ bookid: location.state._id, authorid: tacgia._id }} />
                                                        <UpdateAuthor author={{ bookid: location.state._id, authorid: tacgia._id }} />
                                                    </div>
                                                }
                                                else {
                                                    return <div style={{ display: "inline", marginRight: "3px" }} key={key}>
                                                        {tacgia.TenTacGia}
                                                        <DeleteAuthor author={{ bookid: location.state._id, authorid: tacgia._id }} />
                                                        <UpdateAuthor author={{ bookid: location.state._id, authorid: tacgia._id }} />
                                                        ,
                                                    </div>
                                                }
                                            }) : <span>??ang ti???n h??nh</span>}</div>
                                        <InsertAuthor bookid={location.state._id} />
                                    </div>
                                    <InsertCategory bookid={location.state._id}></InsertCategory>
                                    <div style={{ display: "inline" }}>
                                        <div style={{ marginTop: "14px" }}>
                                            <LocalOfferIcon style={{ height: "22px", marginRight: "10px" }}></LocalOfferIcon>
                                            Th??? lo???i: {location.state.TheLoai.length > 0 ? location.state.TheLoai.map((theloai, keycategory) => {
                                                if (keycategory === location.state.TheLoai.length - 1) {
                                                    return <div style={{ display: "inline" }} key={keycategory}>
                                                        {theloai.TenTheLoai}
                                                    </div>
                                                }
                                                else {
                                                    return <div style={{ display: "inline", marginRight: "3px" }} key={keycategory}>
                                                        {theloai.TenTheLoai}
                                                        ,
                                                    </div>
                                                }
                                            }) :
                                                <span>??ang ti???n h??nh</span>}
                                        </div>
                                    </div>
                                    <div>
                                        <p style={{marginTop:"14px"}}>
                                            <VisibilityIcon style={{ marginRight: "10px" }}></VisibilityIcon>
                                            L?????t xem: {location.state.LuotXem}
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            <PlaceIcon style={{ marginRight: "10px" }}></PlaceIcon>
                                            V??? tr??: {location.state.ViTri}
                                        </p>
                                    </div>
                                    <div>
                                        {location.state.Chapter.length > 0 ?
                                            <Link style={{ marginRight: "9px" }}
                                                to={{
                                                    pathname: `/trangdocsach/${location.state._id}/${location.state.Chapter[0]._id}`
                                                }}> <button className='read-button' type="button">
                                                    ?????c t??? ?????u
                                                </button>
                                            </Link>
                                            :
                                            <Link to={{
                                                pathname: `/trangchapter/${location.state._id}`
                                            }}>
                                            </Link>
                                        }
                                        {
                                            checkIfLoggedUser != null ?
                                                <Link state={location.state._id} to="/trangmuonsach">
                                                    <button className='borrow-book-button' type="button">
                                                        M?????n s??ch
                                                    </button>
                                                </Link>
                                                :
                                                <button onClick={BorrowBookDeny} className='borrow-book-button' type="button">
                                                    M?????n s??ch
                                                </button>
                                        }
                                    </div>
                                    <div>
                                        <button onClick={() => {
                                            if (window.confirm("ban co muon tai ve") === true) {
                                                window.parent.open(location.state.NoiDung)
                                            }
                                            else {
                                                alert("ban da huy tai ve")
                                            }
                                        }} className='download-btn' type="button">
                                            Download
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <div style={{ marginTop: "20px" }}>
                                    <DescriptionOutlinedIcon style={{ height: "27px", marginBottom: "8px" }}></DescriptionOutlinedIcon>
                                    <p style={{ fontSize: "20px", display: "inline" }}>N???i dung:</p>
                                </div>
                            </Row>
                            <Row style={{ height: "2px", backgroundColor: "blue", marginLeft: "1px" }}></Row>
                            <Row>
                                <p>{location.state.MoTa}</p>
                            </Row>
                            <Row>
                                <div style={{ marginTop: "10px" }}>
                                    <FormatListBulletedIcon style={{ height: "27px", marginBottom: "5px" }}></FormatListBulletedIcon>
                                    <p style={{ display: "inline", fontSize: "20px" }}>Danh s??ch ch????ng</p>
                                </div>
                            </Row>
                            <Row style={{ height: "2px", backgroundColor: "blue", marginLeft: "1px" }}></Row>
                            <Row style={{ border: "groove", borderRadius: "5px", marginTop: "10px" }}>
                                <InsertChapter bookid={location.state._id} />
                                {location.state.Chapter.length > 0 ? location.state.Chapter.map((chapter, key1) => {
                                    return <div style={{ margin: "5px" }} key={key1}>
                                        <Link
                                            to={{
                                                pathname: `/trangdocsach/${location.state._id}/${chapter._id}`
                                            }} state={chapter} style={{ display: "inline", margin: "5px", textDecoration: "none", color: "black" }}>{chapter.ChapterTitle}
                                        </Link>
                                        <DeleteChapter style={{ display: "inline" }} page={{ bookid: location.state._id, chapterid: chapter._id }} />
                                        <UpdateChapter style={{ display: "inline" }} chap={{ bookid: location.state._id, chapterid: chapter._id }} />
                                        <div style={{ display: "block" }}>..............................................................................</div>
                                    </div>
                                }) : <div>??ang c???p nh???t</div>}
                            </Row>
                            <Row style={{ marginTop: "10px" }}>
                                <ButtonComment bookid={location.state._id} />
                            </Row>
                            <Row>
                                {location.state.BinhLuan.length > 0 ? location.state.BinhLuan.map((binhluan, key2) => {
                                    return <div key={key2}>
                                        <CommentBlock binhluanstate={{ binhluanid: binhluan._id, noidung: binhluan.NoiDung }} />
                                    </div>
                                }) : <div>Ch??a c?? b??nh lu???n n??o</div>}
                            </Row>
                        </Col>
                        <Col lg={3}>

                        </Col>
                    </Row> :
                    <p>{loadingstate}</p>
            }
        </Container>
    )
}

export default TrangChapter


