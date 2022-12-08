import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function RegisterForm() {
    const [TaiKhoan, setTaiKhoan] = useState('');
    const [MatKhau, setMatKhau] = useState('');
    const [cMatKhau, setConfirmPassword] = useState('');
    const [Email, setEmail] = useState('');
    const [UserName, setUserName] = useState('');
    //biến con trỏ focus nếu chưa nhập thông tin
    const uname = useRef();
    const upass = useRef();
    const ucpass = useRef();
    const usname = useRef();
    const navigate = useNavigate();

    const HandleUpLoad = (e) => {
        e.preventDefault();

        if (TaiKhoan === '') {
            alert("Vui long dien ten dang nhap");
            uname.current.focus();
        }
        if (UserName === '') {
            alert("Vui long dien ten");
            uname.current.focus();
        }
        else if (MatKhau === '') {
            alert("Vui long dien mat khau");
            upass.current.focus();
        }
        else if (cMatKhau === '') {
            alert("Vui long dien mat khau");
            ucpass.current.focus();
        }
        else {
            if (MatKhau === cMatKhau) {
                const user = {
                    TaiKhoan: TaiKhoan,
                    MatKhau: MatKhau,
                    Email: Email,
                    UserName: UserName,
                };
                axios
                    .post(`http://localhost:4000/register/form/`, user)
                    .then(res => {
                        if (res.data === "User is already existed") {
                            alert(res.data)
                        }
                        else {
                            alert(res.data)
                            navigate('/loginform')
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            else {
                alert("Wrong confirm password");
            }
        }
    }
    return (
        <Form style={{ border: "1px solid black", borderRadius: "10px", padding: "10px", margin: "5% 30%" }} onSubmit={HandleUpLoad} encType='multipart/form-data'>
            <h1 style={{ textAlign: "center" }}>Đăng kí</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Tài khoản</Form.Label>
                <Form.Control onChange={e => setTaiKhoan(e.target.value)} ref={uname} type='text' placeholder="Nhập tài khoản" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
                <Form.Control onChange={e => setUserName(e.target.value)} ref={usname} type='text' placeholder="Nhập username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control onChange={e => setEmail(e.target.value)} ref={upass} type="email" placeholder="Nhập email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control onChange={e => setMatKhau(e.target.value)} ref={upass} type="password" placeholder="Nhập mật khẩu" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Nhập lại mật khẩu</Form.Label>
                <Form.Control onChange={e => setConfirmPassword(e.target.value)} ref={ucpass} type="password" placeholder="Xác nhận mật khẩu" />
            </Form.Group>
            <div style={{ textAlign: "center" }}>
                <Button style={{ margin: "10px" }} variant="primary" type="submit">
                    Đăng kí
                </Button>
            </div>
        </Form >
    )
}
export default RegisterForm;
