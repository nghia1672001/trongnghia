import React, { useEffect } from 'react'

import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from 'axios';
import './Home.css';
import Insert from '../../Buttons/ButtonsBook/Insert';
import Update from '../../Buttons/ButtonsBook/Update';
import Delete from '../../Buttons/ButtonsBook/Delete';
import { useState } from 'react';
import CommentBlock from '../../functionality/CommentBlock/CommentBlock';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Home({ toHome }) {
    const [commentlist, setCommentList] = useState([]);
    const [commentstatus, setCommentStatus] = useState(false);

    const [carouselbooklist, setCarouselBookList] = useState([]);
    const [carouseltatus, setCarouselStatus] = useState(false);
    async function tangluot(id) {
        await axios
            .put(`http://localhost:4000/luotxem/update/${id}`);
    }
    console.log(toHome);

    useEffect(() => {
        axios.get(`http://localhost:4000/comment/alls`)
            .then(res => {
                setCommentList(res.data);
                setCommentStatus(true);
            })
            .catch(err => {
                console.log(err);
            });

        axios.get(`http://localhost:4000/books/alldecreaseview`)
            .then(res => {
                setCarouselBookList(res.data);
                setCarouselStatus(true);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    return (
        <Container style={{ margin: "20px auto" }}>
            <Row>
                <Carousel
                    swipeable
                    responsive={
                        {
                            superLargeDesktop: {
                                // the naming can be any, depends on you.
                                breakpoint: { max: 4000, min: 3000 },
                                items: 5
                            },
                            desktop: {
                                breakpoint: { max: 3000, min: 1024 },
                                items: 4
                            },
                            tablet: {
                                breakpoint: { max: 1024, min: 464 },
                                items: 3
                            },
                            mobile: {
                                breakpoint: { max: 464, min: 0 },
                                items: 2
                            }
                        }
                    }>
                    {
                        carouseltatus ?
                            carouselbooklist.map((book, bookitem) => {
                                return <div key={bookitem} className='carousel-item-container'>
                                    <img src={book.BookImage} alt="" />
                                    <div className='carousel-item-text'>
                                        <h4>{book.TenSach}</h4>
                                        <p>{book.Chapter[0]}</p>
                                    </div>
                                </div>
                            }) :
                            <p>Loading item</p>
                    }
                </Carousel>
            </Row>
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
                                    truyen.Chapter ? truyen.Chapter.reverse().map((chapter, key1) => {
                                        if (key1 < 3) {
                                            return <Link onClick={() => tangluot(truyen._id)} to={{
                                                pathname: `/trangdocsach/${truyen._id}/${chapter._id}`
                                            }} key={key1}>{chapter.ChapterTitle}</Link>
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
                    {
                        commentstatus ?
                            commentlist.reverse().map((comment, key2) => {
                                return <div key={key2}>
                                    <CommentBlock binhluanstate={{ binhluanid: comment._id, noidung: comment.NoiDung }} />
                                </div>
                            }) :
                            <p>Comment is loading....</p>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Home