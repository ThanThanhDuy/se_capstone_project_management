import React, { useState } from "react";
import "../../styles/login/Login.scss";
import logo from "../../assets/logo/logo_fpt.png";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, provider } from "../../utils/firebase/firebase.utils";
import Grow from "@mui/material/Grow";
import Scrum from "../../assets/svg/scrum.svg";

function Login() {
  const [campus, setCampus] = useState("");
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({});

  const handleChangeCampus = (event) => {
    setCampus(event.target.value);
  };

  const loginWithGoogle = () => {
    if (campus) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          console.log(result);
          if (result.user) {
            if (
              result.user.email &&
              result.user.email.includes("@fpt.edu.vn")
            ) {
              setUser(result.user);
            } else {
              throw "Email don't belong to FPT";
            }
          } else {
            throw "User is not defined";
          }
        })
        .catch((errorMes) => {
          setError({
            mes: errorMes,
            severity: "error",
          });
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
          }, 3000);
          auth.signOut();
        });
    } else {
      setError({
        mes: "Please select campus",
        severity: "warning",
      });
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  };

  return (
    <div className="login">
      <div className="login_form">
        <div className="login_form--logo">
          <img src={logo} alt="logo_fpt" />
        </div>
        <div className="login_boxForm">
          <div className="login_form--welcome">
            <p>Welcome to SCM</p>
            <p>SE Capstone Project</p>
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
        <Grow in={open}>
          <Alert
            severity={error.severity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {error.mes}
          </Alert>
        </Grow>
      </div>
      <div className="login_background">
        <img src={Scrum} alt="" />
      </div>
    </div>
  );
}

export default Login;
