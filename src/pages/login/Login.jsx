import React, { useState } from 'react'
import '../../styles/login/Login.scss'
import logo from '../../assets/logo/logo_fpt.png'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import GoogleIcon from '@mui/icons-material/Google'
import { auth, provider } from '../../utils/firebase/firebase.utils'

function Login() {
  const [campus, setCampus] = useState('')
  const [user, setUser] = useState(null)

  const handleChangeCampus = event => {
    setCampus(event.target.value)
  }

  const loginWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then(result => {
        console.log(result)
      })
      .catch(alert)
  }
  return (
    <div className="login">
      <div className="login_form">
        <div className="login_form--logo">
          <img src={logo} alt="logo_fpt" />
        </div>
        <div className="login_form--welcome">
          <p>Welcome</p>
        </div>
        <div className="login_form--box">
          <Select value={campus} onChange={handleChangeCampus} displayEmpty>
            <MenuItem value="">Select campus</MenuItem>
            <MenuItem value="FUHL">FU-Hòa Lạc</MenuItem>
            <MenuItem value="FUHCM">FU-Hồ Chí Minh</MenuItem>
            <MenuItem value="FUDN">FU-Đà Nẵng</MenuItem>
            <MenuItem value="FUCT">FU-Cần Thơ</MenuItem>
            <MenuItem value="FUQN">FU-Quy Nhơn</MenuItem>
          </Select>
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={loginWithGoogle}
          >
            Login with @fpt.edu.vn
          </Button>
        </div>
      </div>
      <div className="login_background"></div>
    </div>
  )
}

export default Login
