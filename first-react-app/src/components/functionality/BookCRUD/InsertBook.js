import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import storage from "../../../FirebaseConfig"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import axios from 'axios';

import './BookCRUD.css';


function InsertBook() {
    const [TenSach, setTenSach] = useState('');
    const [SoLuong, setSoLuong] = useState('');
    const [MoTa, setMoTa] = useState('');
    const [NamSangTac, setNamSangTac] = useState('');
    const [ViTri, setViTri] = useState("");
    const [file, setFile] = useState("");
    const [file1, setFile1] = useState("");
    const unamebook = useRef();
    const uslot = useRef();
    const udecrip = useRef();
    const uyear = useRef();
    const ulocation = useRef();
    const navigate = useNavigate();
    const loadingbtn = useRef();

    const [loading,setLoading] = useState('loading-hidden');

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
        else if (ViTri === '') {
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
                            ViTri: ViTri,
                            BookImage: url,
                        };
                        console.log(book);

                        axios
                            .post(`http://localhost:4000/add/book/`, book)
                            .then(async (res) => {
                                alert("Hinh anh da upload thanh cong... Vui long doi them it phut")

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
                                                ViTri: ViTri,
                                                NoiDung: url1,
                                            };
                                            axios
                                                .put(`http://localhost:4000/add/updatepdf/${res.data.bookid._id}`, book)
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
            <h1 style={{ textAlign: "center" }}>Th??m s??ch</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>T??n s??ch</Form.Label>
                <Form.Control onChange={e => setTenSach(e.target.value)} ref={unamebook} type='text' placeholder="Nh???p t??n s??ch" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>N???i dung</Form.Label>
                <Form.Control onChange={e => setFile1(e.target.files[0])} type='file' placeholder="Vui l??ng ch???n t??i lieu" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>V??? tr??</Form.Label>
                <Form.Control onChange={e => setViTri(e.target.value)} ref={ulocation} type='text' placeholder="Vui l??ng ??i???n v??? tr?? s??ch" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>???nh b??a</Form.Label>
                <Form.Control onChange={e => setFile(e.target.files[0])} type='file' placeholder="Vui l??ng ch???n ???nh" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>S??? l?????ng</Form.Label>
                <Form.Control onChange={e => setSoLuong(e.target.value)} ref={uslot} type='text' placeholder="Nh???p s??? l?????ng s??ch" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>M?? t???</Form.Label>
                <Form.Control onChange={e => setMoTa(e.target.value)} ref={udecrip} type="text" placeholder="Nh???p m?? t???" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>N??m s??ng t??c</Form.Label>
                <Form.Control onChange={e => setNamSangTac(e.target.value)} ref={uyear} type="text" placeholder="Nh???p n??m s??ng t??c" />
            </Form.Group>
            <div style={{ textAlign: "center" }}>
                <Button ref={loadingbtn} style={{ margin: "10px" }} variant="primary" type="submit">
                    Th??m S??ch
                </Button>
            </div>
        </Form >
    )
}
export default InsertBook