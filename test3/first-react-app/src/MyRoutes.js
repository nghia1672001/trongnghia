import React from 'react'
import { Routes } from 'react-router'
import { Route } from 'react-router-dom'
import LoginForm from './components/functionality/Authorization/LoginForm/LoginForm'
import RegisterForm from './components/functionality/Authorization/RegisterForm/RegisterForm'
import Home from './components/MyBody/Home/Home'
import TrangBa from './components/MyBody/TrangBa'
import TrangBon from './components/MyBody/TrangBon'
import TrangChapter from './components/MyBody/TrangChapter/TrangChapter'
import TrangDocSach from './components/MyBody/TrangDocSach/TrangDocSach'
import TrangHai from './components/MyBody/TrangHai'
import TrangMot from './components/MyBody/TrangMot'
import TrangThemSach from './components/MyBody/TrangThemSach/TrangThemSach'
import TrangUpdate from './components/MyBody/TrangUpdate/TrangUpdate'

function MyRoutes({toRoute}) {
  return (
    <Routes>
      <Route path='/' element={<Home toHome={toRoute} />} />
      <Route path='/trang1' element={<TrangMot />} />
      <Route path='/trang2' element={<TrangHai />} />
      <Route path='/trang3' element={<TrangBa />} />
      <Route path='/loginform' element={<LoginForm />} />
      <Route path='/trangbon' element={<TrangBon />} />
      <Route path='/registerform' element={<RegisterForm />} />
      <Route path='/trangthemsach' element={<TrangThemSach />} />
      <Route path='/trangupdate' element={<TrangUpdate />} />
      <Route path='/trangchapter/:tentruyen' element={<TrangChapter />} />
      <Route path='/trangdocsach/:tenchapter' element={<TrangDocSach />} />
    </Routes>
  )
}

export default MyRoutes