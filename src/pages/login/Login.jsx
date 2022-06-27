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
import bg_login from "../../assets/svg/bg_login.svg";
import { UilMapMarker, UilEnvelopeAlt } from "@iconscout/react-unicons";

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
    <div style={{ position: "relative" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      {/* <div className="login">
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
      </div> */}
      {/* new login */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          justifyContent: "center"
        }}
      >
        <div style={{ display: "flex", gap: 100, position: "relative" }}>
          <div className="left">
            <img
              src={logo}
              style={{ position: "absolute", top: -100, left: -30, width: 200 }}
              alt="logo_fpt"
            />
            <img style={{ width: 600 }} src={bg_login} alt="" />
          </div>
          <div className="right">
            <div className="login_boxForm">
              <div className="login_form--box">
                <p style={{ fontWeight: 400, marginBottom: 0, fontSize: 36 }}>
                  Welcome to SCM
                </p>
                <span style={{ fontWeight: 300, fontSize: 14 }}>
                  SE capstone project management
                </span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    marginTop: 50
                  }}
                >
                  <Select
                    style={{
                      width: "350px",
                      fontSize: 16
                    }}
                    placeholder="Select campus"
                    onChange={_handleChangeCampus}
                    value={_campus}
                  >
                    <Option className="option-item" key={"a"} value={""}>
                      <span>Select Campus</span>{" "}
                      <span
                        style={{
                          color: "red"
                        }}
                      >
                        *
                      </span>
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
                      height: "45px",
                      width: "350px",
                      borderRadius: "10px",
                      fontSize: 16
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
      </div>
      <div
        className="footer"
        style={{
          backgroundColor: "#fff",
          height: 160,
          width: "100%",
          position: "absolute",
          bottom: 0,
          left: 0,
          boxShadow: "0px -1px 10px rgba(0, 0, 0, 0.3)",
          padding: "10px 350px 0 350px"
        }}
      >
        <div style={{ display: "flex", gap: 50, color: "#44494D" }}>
          <div>
            <span style={{ fontSize: 14 }}>
              Sinh viên có nhu cầu thực hiện các thủ tục, dịch vụ vui lòng liên
              hệ Trung tâm Dịch vụ Sinh viên tại Phòng 202.
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 18, fontWeight: 400 }}>Information</div>
            <div>
              <ul style={{ fontSize: 14 }}>
                <li>
                  <a
                    style={{ color: "#000", textDecoration: "underline" }}
                    href="#"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{ color: "#000", textDecoration: "underline" }}
                  >
                    Terms of Use
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 18, fontWeight: 400 }}>Contact</div>
            <div style={{ fontSize: 14, display: "flex", gap: 5 }}>
              <div>
                <UilMapMarker />
              </div>
              <div>
                <span>
                  Lô E2a-7, Đường D1, Khu Công nghệ cao, P.Long Thạnh Mỹ, Tp.
                  Thủ Đức, TP.HCM.
                </span>
              </div>
            </div>
            <div
              style={{ fontSize: 14, display: "flex", gap: 8, marginTop: 5 }}
            >
              <div>
                <UilEnvelopeAlt />
              </div>
              <div>
                <span style={{ fontWeight: 600 }}>sschcm@fe.edu.vn</span>
              </div>
            </div>
          </div>
        </div>
        <Divider style={{ marginBottom: 7, marginTop: 2 }} />
        <div>
          <span style={{ color: "#00796a" }}>
            {" "}
            FPT University HCM ©2022 Created by Group 2 SWP
          </span>
        </div>
      </div>
    </div>
  );
}
export default Login;
