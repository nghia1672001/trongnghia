import React from 'react'
import { Link } from 'react-router-dom'
import './LoginButton.css'

function LoginButton() {
  return (
    <Link className='btn btn-primary login-button' role='button' to='/loginform'>Login</Link>
  )
}
export default LoginButton