import React, { useState, useEffect } from "react";
import logo from "../../assets/logo/logo_fpt.png";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { auth, provider } from "../../utils/firebase/firebase.utils";
import { userAuthState, userState } from "../../../store/user/user";
import campusService from "../../services/campus";
import userService from "../../services/user";
import { Spin, Space, Button, Divider, Typography, Layout } from "antd";
import { Select } from "antd";
import "../../styles/login/Login.scss";
import openNotification from "../../components/common/notification";
import { GoogleOutlined } from "@ant-design/icons";
import ROLE from "../../constant/role";
import { Helmet } from "react-helmet";

const { Option } = Select;

const ROLE_MAP = {
  "": ""
};
function Login() {
  const navigate = useNavigate();
  const setUserAuthState = useSetRecoilState(userAuthState);
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
  const _handleChangeCampus = event => {
    _setCampus(event);
  };

  const _loginWithGoogle = async () => {
    console.log(typeof _campus);
    if (_campus) {
      const result = await auth.signInWithPopup(provider).then(result => {
        return result;
      });

      if (result) {
        // dummy check fpt account
        const response = await userService.login(_campus, result);
        // console.log(response);
        if (response.code === 200) {
          openNotification("success", response.message);
          let data = response.data;
          localStorage.setItem("data", JSON.stringify(data));
          setUserAuthState(data);
          console.log(
            data.User.Roles.find(role =>
              [ROLE.STUDENT, ROLE.LECTURE].includes(role.RoleId)
            )
          );
          if (
            data.User.Roles.find(role =>
              [ROLE.STUDENT, ROLE.LECTURE].includes(role.RoleId)
            )
          ) {
            navigate("/user");
          } else if (
            data.User.Roles.find(role => [ROLE.ADMIN].includes(role.RoleId))
          ) {
            navigate("/admin");
          }
        } else {
          openNotification("warning", response.message);
        }
      }
    } else {
      openNotification("warning", "Please choose campus");
    }
  };
  if (_isLoading) {
    return (
      <Space
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30%"
        }}
      >
        <Spin size="large" />
      </Space>
    );
  }
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <div className="login">
        <div className="login_form">
          <div className="login_form--logo">
            <img src={logo} alt="logo_fpt" />
          </div>
          <Divider />
          <div className="login_boxForm">
            <div className="login_form--box">
              <Typography.Title>Welcome to FAP</Typography.Title>
              <Select
                style={{
                  width: "250px"
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
                    <Option key={key} value={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
              <Button
                style={{
                  backgroundColor: "#00796a",
                  color: "#fff",
                  height: "40px",
                  width: "250px"
                }}
                icon={<GoogleOutlined />}
                onClick={_loginWithGoogle}
              >
                Login with @fpt.edu.vn
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
