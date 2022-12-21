import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import storage from "../../../FirebaseConfig"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import axios from 'axios';
import { useEffect } from 'react';

import './BookCRUD.css';


function UpdateBook(id) {
    const [TenSach, setTenSach] = useState('');
    const [SoLuong, setSoLuong] = useState('');
    const [MoTa, setMoTa] = useState('');
    const [NamSangTac, setNamSangTac] = useState('');
    const [vitri, setViTri] = useState("");
    const [file, setFile] = useState("");
    const [file1, setFile1] = useState("");
    const unamebook = useRef();
    const uslot = useRef();
    const udecrip = useRef();
    const uyear = useRef();
    const ulocation = useRef();
    const navigate = useNavigate();
    const [loading,setLoading] = useState('loading-hidden');

    const loadingbtn = useRef();

    useEffect(() => {
        axios.put(`http://localhost:4000/add/singlebook/${id.id}`)
            .then(res => {
                setTenSach(res.data.TenSach);
                setSoLuong(res.data.SoLuong);
                setMoTa(res.data.MoTa);
                setNamSangTac(res.data.NamSangTac);
            })
            .catch(err => {
            });
    }, [id])

    const Nhapvao = async (e) => {
        loadingbtn.current.setAttribute("disabled", "disabled");
        e.preventDefault();
        setLoading('loading-show');

        if (TenSach === '') {
            alert("Vui long nhap ten sach");
            unamebook.current.focus();
        }
        else if (SoLuong === '') {
            alert("Vui long nhap so luong sach");
            uslot.current.focus();
        }
        else if (vitri === '') {
            alert("Vui long nhap so luong sach");
            ulocation.current.focus();
        }
        else if (!file) {
            alert("Please choose a file first!")
            return;
        }
        else if (MoTa === '') {
            alert("Vui long nhap mo ta");
            udecrip.current.focus();
        }
        else if (NamSangTac === '') {
            alert("Vui long dien nam sang tac");
            uyear.current.focus();
        }
        else {
            const storageRef = ref(storage, `/book/bookimage/${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file);

            await uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                    }
                },
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        console.log(url);

                        const book = {
                            TenSach: TenSach,
                            SoLuong: SoLuong,
                            MoTa: MoTa,
                            NamSangTac: NamSangTac,
                            ViTri: vitri,
                            BookImage: url,
                        };
                        console.log(book);
                        axios
                            .put(`http://localhost:4000/add/updatebook/${id.id}`, book)
                            .then(res => {
                                console.log(res.data);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    });
                })

            const storageRef1 = ref(storage, `/book/bookdocument/${file1.name}`)
            const uploadTask1 = uploadBytesResumable(storageRef1, file1);

            await uploadTask1.on(
                "state_changed",
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                    }
                },
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask1.snapshot.ref).then((url1) => {
                        console.log(url1);

                        const book = {
                            TenSach: TenSach,
                            SoLuong: SoLuong,
                            MoTa: MoTa,
                            NamSangTac: NamSangTac,
                            ViTri: vitri,
                            NoiDung: url1,
                        };
                        axios
                            .put(`http://localhost:4000/add/updatepdf/${id.id}`, book)
                            .then(res => {
                                alert(res.data)
                                navigate('/')
                                window.location.reload();
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    });
                })
        }
    }
    return (
        <Form className='form-book' onSubmit={Nhapvao} encType='multipart/form-data'>
             <div className={loading}>
                <img width="10%" height="auto" style={{ display:"block" ,marginLeft:"auto", marginRight:"auto" , marginTop:"40vh"}} src={process.env.PUBLIC_URL + `/image/Youtube_loading_symbol_1_(wobbly).gif`} alt="" />
            </div>
            <h1 style={{ textAlign: "center" }}>Cap nhat sách</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Tên sách</Form.Label>
                <Form.Control value={TenSach ?? ""} onChange={e => setTenSach(e.target.value)} ref={unamebook} type='text' placeholder="Nhập tên sách" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nội dung</Form.Label>
                <Form.Control onChange={e => setFile1(e.target.files[0])} type='file' placeholder="Vui lòng chọn tài lieu" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Vị trí</Form.Label>
                <Form.Control onChange={e => setViTri(e.target.value)} ref={ulocation} type='text' placeholder="Vui lòng điền vị trí sách" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ảnh bìa</Form.Label>
                <Form.Control onChange={e => setFile(e.target.files[0])} type='file' placeholder="Vui lòng chọn ảnh" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control value={SoLuong ?? ""} onChange={e => setSoLuong(e.target.value)} ref={uslot} type='text' placeholder="Nhập số lượng sách" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control value={MoTa ?? ""} onChange={e => setMoTa(e.target.value)} ref={udecrip} type="text" placeholder="Nhập mô tả" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Năm sáng tác</Form.Label>
                <Form.Control value={NamSangTac ?? ""} onChange={e => setNamSangTac(e.target.value)} ref={uyear} type="text" placeholder="Nhập năm sáng tác" />
            </Form.Group>
            <div style={{ textAlign: "center" }}>
                <Button ref={loadingbtn} style={{ margin: "10px" }} variant="primary" type="submit">
                    Thêm Sách
                </Button>
            </div>
        </Form >
    )
}
export default UpdateBook