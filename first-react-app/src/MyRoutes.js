import React from 'react'
import { Routes } from 'react-router'
import { Route } from 'react-router-dom'
import LoginForm from './components/functionality/Authorization/LoginForm/LoginForm'
import RegisterForm from './components/functionality/Authorization/RegisterForm/RegisterForm'
import Home from './components/MyBody/Home/Home'
import TrangChapter from './components/MyBody/TrangChapter/TrangChapter'
import TrangDocSach from './components/MyBody/TrangDocSach/TrangDocSach'
import TrangLichSu from './components/MyBody/TrangLichSu/TrangLichSu'
import TrangMuonSach from './components/MyBody/TrangMuonSach/TrangMuonSach'
import TrangThemSach from './components/MyBody/TrangThemSach/TrangThemSach'
import TrangUpdate from './components/MyBody/TrangUpdate/TrangUpdate'
import TrangThongTinUser from './components/MyBody/TrangThongTinUser/TrangThongTinUser'
import TrangDatBan from './components/MyBody/TrangDatBan/TrangDatBan'

function MyRoutes({toRoute}) {
  return (
    <Routes>
      <Route path='/' element={<Home toHome={toRoute} />} />
      <Route path='/trangdatban' element={<TrangDatBan />} />
      <Route path='/tranglichsu' element={<TrangLichSu />} />
      <Route path='/loginform' element={<LoginForm />} />
      <Route path='/trangthongtinuser' element={<TrangThongTinUser />} />
      <Route path='/registerform' element={<RegisterForm />} />
      <Route path='/trangthemsach' element={<TrangThemSach />} />
      <Route path='/trangupdate' element={<TrangUpdate />} />
      <Route path='/trangchapter/:tentruyen' element={<TrangChapter />} />
      <Route path='/trangdocsach/:tentruyen/:tenchapter' element={<TrangDocSach />} />
      <Route path='/trangmuonsach' element={<TrangMuonSach />} />
    </Routes>
  )
}

export default MyRoutes