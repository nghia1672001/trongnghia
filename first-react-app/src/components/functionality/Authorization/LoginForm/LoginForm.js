import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function LoginForm() {

    const [TaiKhoan, setTaiKhoan] = useState('');
    const [MatKhau, setMatKhau] = useState('');

    const uname = useRef();
    const upass = useRef();

    const navigate = useNavigate();

    const HandleUpLoad = (e) => {
        e.preventDefault();

        if (TaiKhoan === '') {
            alert("Vui long dien ten dang nhap");
            uname.current.focus();
        }
        else if (MatKhau === '') {
            alert("Vui long dien mat khau");
            upass.current.focus();
        }
        else {
            const user = {
                TaiKhoan,
                MatKhau
            };
            axios
                .post(`http://localhost:4000/user/login/`, user)
                .then(res => {
                    localStorage.setItem('user', res.data.user._id)
                    // if (res.data.user.usertype) {
                    //     localStorage.setItem('userrole', res.data.user.usertype)
                    // }
                    alert(res.data.message)
                    navigate('/')
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                    alert("Sai ten dang nhap hoac mat khau")
                    uname.current.focus();
                });
        }
    }
    return (
        <Form style={{ border: "1px solid black", borderRadius: "10px", padding: "10px", margin: "5% 30%" }} onSubmit={HandleUpLoad} encType='multipart/form-data'>
            <h1 style={{ textAlign: "center" }}>Đăng nhập</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Tài khoản</Form.Label>
                <Form.Control onChange={e => setTaiKhoan(e.target.value)} ref={uname} type='text' placeholder="Nhập tài khoản" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control onChange={e => setMatKhau(e.target.value)} ref={upass} type="password" placeholder="Nhập mật khẩu" />
            </Form.Group>

            <div style={{ textAlign: "center" }}>
                <Button style={{ margin: "10px" }} variant="primary" type="submit">
                    Đăng nhập
                </Button>
            </div>
            <div>
                <p>Bạn chưa có tài khoản? <Link to="/registerform">Đăng kí</Link></p>
            </div>
        </Form>
    )
}

export default LoginForm
