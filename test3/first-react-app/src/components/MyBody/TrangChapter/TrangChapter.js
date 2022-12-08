import React, { useState } from 'react'

import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router-dom';

import './TrangChapter.css'
import InsertAuthor from '../../Buttons/ButtonAuthor/InsertAuthor';
import DeleteAuthor from '../../Buttons/ButtonAuthor/DeleteAuthor';
import InsertChapter from '../../Buttons/ButtonChapter/InsertChapter';
import DeleteChapter from '../../Buttons/ButtonChapter/DeleteChapter';
import UpdateAuthor from '../../Buttons/ButtonAuthor/UpdateAuthor';
import UpdateChapter from '../../Buttons/ButtonChapter/UpdateChapter';
import ButtonComment from '../../Buttons/ButtonComment/ButtonComment';

import CommentBlock from '../../functionality/CommentBlock/CommentBlock';

function TrangChapter() {
    const location = useLocation();
    console.log(location);

    return (
        <Container>
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
                                <div style={{ display: "block" }}> Tác giả: {location.state.TacGia.length > 0 ? location.state.TacGia.map((tacgia, key) => {
                                    if (key === location.state.TacGia.length - 1) {
                                        return <div style={{ display: "inline" }} key={key}>
                                            {tacgia.TenTacGia}
                                            <DeleteAuthor author={{ bookid: location.state._id, authorid: tacgia._id }} />
                                            <UpdateAuthor author={{ bookid: location.state._id, authorid: tacgia._id }} />
                                        </div>
                                    }
                                    else {
                                        return <div style={{ display: "inline" }} key={key}>
                                            {tacgia.TenTacGia}
                                            <DeleteAuthor author={{ bookid: location.state._id, authorid: tacgia._id }} />
                                            <UpdateAuthor author={{ bookid: location.state._id, authorid: tacgia._id }} />
                                            ,
                                        </div>
                                    }
                                }) : <span>Đang tiến hành</span>}</div>
                                <InsertAuthor bookid={location.state._id} />
                            </div>
                            <div>
                                <p>Lượt xem: {location.state.LuotXem}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        noidung
                    </Row>
                    <Row >
                        Danh sách chương:
                    </Row>
                    <Row>
                        <InsertChapter bookid={location.state._id} />
                        {location.state.Chapter.length > 0 ? location.state.Chapter.map((chapter, key1) => {
                            return <div style={{ margin: "5px" }} key={key1}>
                                <Link to={{
                                    pathname: `/trangdocsach/${chapter._id.slice(0, 7)}`
                                }} state={chapter} style={{ display: "inline", margin: "5px" }}>{chapter.ChapterTitle}</Link>
                                <DeleteChapter style={{ display: "inline" }} page={{ bookid: location.state._id, chapterid: chapter._id }} />
                                <UpdateChapter style={{ display: "inline" }} chap={{ bookid: location.state._id, chapterid: chapter._id }} />
                            </div>
                        }) : <div>Đang cập nhật</div>}
                    </Row>
                    <Row>
                        <ButtonComment bookid={location.state._id} />
                    </Row>
                    <Row>
                        {location.state.BinhLuan.length > 0 ? location.state.BinhLuan.map((binhluan, key2) => {
                            return <div key={key2}>
                                <CommentBlock binhluanid ={binhluan._id}/>
                            </div>
                        }) : <div>Chưa có bình luận nào</div>}
                    </Row>
                </Col>
                <Col lg={3}>

                </Col>
            </Row>
        </Container>
    )
}

export default TrangChapter


