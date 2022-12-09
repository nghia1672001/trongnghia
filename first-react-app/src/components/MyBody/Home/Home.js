import React from 'react'

import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from 'axios';
import './Home.css';
import Insert from '../../Buttons/ButtonsBook/Insert';
import Update from '../../Buttons/ButtonsBook/Update';
import Delete from '../../Buttons/ButtonsBook/Delete';

function Home({ toHome }) {
    async function tangluot(id){
        await axios
            .put(`http://localhost:4000/luotxem/update/${id}`);
    }
    return (
        <Container style={{ margin: "20px 0px" }} fluid>
            <Insert />
            <Row>
                <Col lg={9}>
                    <Row className="justify-content-center" lg={5} md={4} xs={3}>
                        {toHome ? toHome.reverse().map((truyen, key) => (
                            <Col key={key} className="book-item">
                                <Update bookid={truyen._id} />
                                <Delete bookid={truyen._id} />
                                <img alt="hinhtruyen" src={truyen.BookImage} />
                                <Link state={truyen} onClick={() => tangluot(truyen._id)} to={{
                                    pathname: `/trangchapter/${truyen._id}`
                                }} className='book-item-title'>{truyen.TenSach}</Link>
                                <div>
                                    <p>Lượt xem: {truyen.LuotXem}</p>
                                </div>
                                {
                                    truyen.ChapTer ? truyen.ChapTer.reverse().map((chapter, key1) => {
                                        if (key1 < 3) {
                                            return <Link onClick={() => tangluot(truyen._id)} to={{
                                                pathname: `/trangdocsach/${chapter.ChapterTitle}`
                                            }} key={key1}>{chapter}</Link>
                                        }
                                        else {
                                            return <p key={key1}></p>
                                        }
                                    }) : <div key={key}></div>
                                }
                            </Col>
                        )) : <div>Error Occurs</div>}
                    </Row>
                </Col>
                <Col lg={3}>
                    a
                </Col>
            </Row>
        </Container>
    )
}

export default Home