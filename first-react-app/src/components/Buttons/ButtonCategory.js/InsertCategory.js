import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function InsertCategory(bookid) {
    const [tentheloai, setTenTheLoai] = useState('');
    const [statecategory, setStateCategory] = useState(false);
    const [userrole, setUserRole] = useState('noneuser');
    const [newcategoryname, setNewCategoryName] = useState('');
    const [newcategorydesc, setNewCategoryDesc] = useState('');
    const [statenewcategory, setStateNewCategory] = useState(false);

    const checkIfLoggedUser = localStorage.getItem('user');


    const navigate = useNavigate();
    const location = useLocation();

    const categoryref = useRef();
    const ucatename = useRef();
    const ucatedesc = useRef();

    useEffect(() => {
        if (checkIfLoggedUser) {
            axios.get(`http://localhost:4000/userinfo/getrole/${checkIfLoggedUser}`)
                .then(res => {
                    setUserRole(res.data.Role.toString());
                })
                .catch(err => {
                    console.log(err);
                });

            axios.get(`http://localhost:4000/categories/category`)
                .then((res) => {
                    setTenTheLoai(res.data);
                })
                .catch(err => {
                    alert(err);
                });
        }
        else {
            setUserRole("user");
        }
    }, [checkIfLoggedUser])

    function ConfirmCategory() {
        if (categoryref.current.value === "0") {
            categoryref.current.value = "0";
        }
        else if (categoryref.current.value === "1") {
            categoryref.current.value = "1";
            setStateNewCategory(true);
        }
        else {
            if (window.confirm("Bạn có muốn thêm thể loại này")) {
                axios.post(`http://localhost:4000/add/addcategory/${bookid.bookid}/${categoryref.current.value}`)
                    .then((res) => {
                        if (res.data.Message) {
                            alert(res.data.Message);
                        }
                        else {
                            alert("Thêm thành công");
                            window.location.reload();
                            var temp = location.pathname;
                            temp = temp.split("/");
                            navigate(`/trangchapter/${temp[2]}`);
                        }
                    })
                    .catch(err => {
                        alert(err);
                    })
            }
            else {
                categoryref.current.value = "0";
            }
        }
    }

    function ConfirmNewCategory() {
        if (newcategoryname === "") {
            alert("Vui lòng nhập tên thể loại mới")
            ucatename.current.focus();
        }
        else if (newcategorydesc === "") {
            alert("Vui lòng nhập mô tả")
            ucatedesc.current.focus();
        }
        else {
            const newcategory = {
                TenTheLoai: newcategoryname,
                MoTa: newcategorydesc
            }
            axios.post(`http://localhost:4000/categories/categoryform`, newcategory)
                .then(() => {
                    alert("thêm thành công");
                    window.location.reload();
                })
                .catch(err => {
                    alert(err);
                })
        }
    }

    return (
        <div style={{ display: "inline" }}>
            {
                (userrole && userrole === "admin") ?
                    <div style={{ display: "inline", padding: "2px", alignItems: "center" }}>
                        {
                            statecategory ?
                                <div>
                                    <button onClick={() => {
                                        setStateCategory(false);
                                    }}>-</button>
                                    <div style={{ display: "flex" }}>
                                        <div>
                                            <select ref={categoryref} onChange={ConfirmCategory}>
                                                <option value="0">None</option>
                                                {
                                                    tentheloai ?
                                                        tentheloai.map((c, categorykey) => {
                                                            return <option key={categorykey} value={c._id}>{c.TenTheLoai}</option>
                                                        }) :
                                                        <option>Rỗng</option>
                                                }
                                                <option style={{ color: "green" }} value="1">+ Thêm thể loại mới</option>
                                            </select>
                                        </div>
                                        {
                                            statenewcategory ?
                                                <div>
                                                    <button onClick={() => {
                                                        setStateNewCategory(false);
                                                    }}>X</button>
                                                    <input ref={ucatename} onChange={e => setNewCategoryName(e.target.value)} style={{ margin: "5px 0px", padding: "5px", width: "100%" }} type="text" placeholder="Nhập tên thể loại"></input>
                                                    <textarea ref={ucatedesc} value={newcategorydesc ?? ""} style={{ width: "100%" }} onChange={e => setNewCategoryDesc(e.target.value)}></textarea>
                                                    <button onClick={ConfirmNewCategory}>Xác nhận</button>
                                                </div> :
                                                <div></div>
                                        }
                                    </div>
                                </div> :
                                <div>
                                    <button onClick={() => {
                                        setStateCategory(true);
                                    }}>+</button>
                                </div>
                        }
                    </div>
                    :
                    <div style={{ display: "inline" }}></div>
            }
        </div>
    )
}

export default InsertCategory