import React, { useState, useEffect } from "react";
import logo from "../../assets/logo/logo_fpt.png";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { auth, provider } from "../../utils/firebase/firebase.utils";
import { userState } from "../../../store/user/user";
import campusService from "../../services/campus";
import userService from "../../services/user";
import { Spin, Space } from "antd";
import { Select } from "antd";
import "../../styles/login/Login.scss";
import openNotification from "../../components/common/notification";

const { Option } = Select;

function Login() {
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userState);
  const [_campus, _setCampus] = useState("");
  const [_campuses, _setCampuses] = useState([]);
  const [_isLoading, _setIsLoading] = useState(true);
  const [_token, _setToken] = useState(null);
  useEffect(() => {
    _fetchData();
  }, []);

  const _fetchData = async () => {
    const campuses = await campusService.getAllCampus();
    _setCampuses(campuses);
    _setIsLoading(false);
    return campuses;
  };
  const _handleChangeCampus = (event) => {
    _setCampus(event);
  };

  const _loginWithGoogle = async () => {
    if (_campus) {
      const result = await auth.signInWithPopup(provider).then((result) => {
        return result;
      });

      if (result) {
        // dummy check fpt account
        const response = await userService.login(_campus, result);
        if (response.StatusCode === 200) {
          openNotification("success", response.Message);
          localStorage.setItem("data", response.Data);
        } else {
          openNotification(
            "warning",
            response.Message.split("-")[0],
            response.Message.split("-")[1]
          );
        }
      } else {
        openNotification("warning", "Please choose campus");
      }
    }
  };
  if (_isLoading) {
    return (
      <Space
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30%",
        }}
      >
        <Spin size="large" />
      </Space>
    );
  }
  return (
    <div className="login">
      <div className="login_form">
        <div className="login_form--logo">
          <img src={logo} alt="logo_fpt" />
        </div>
        <div className="login_boxForm">
          <div className="login_form--box">
            <Select
              style={{
                width: "250px",
              }}
              placeholder="Select campus"
              onChange={_handleChangeCampus}
              value={_campus}
            >
              <Option className="option-item" key={"a"} value={""}>
                Select Campus
              </Option>
              {_campuses?.map((item, key) => {
                return (
                  <Option key={key} value={item.Id}>
                    {item.Name}
                  </Option>
                );
              })}
            </Select>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={_loginWithGoogle}
            >
              Login with @fpt.edu.vn
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
