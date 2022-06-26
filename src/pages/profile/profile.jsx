import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Modal, Upload, Spin } from "antd";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase/firebase.utils";
import { InboxOutlined } from "@ant-design/icons";
import moment from "moment";
import { Helmet } from "react-helmet";
import profileService from "../../services/profile";
const { Dragger } = Upload;
import checkURL from "../../utils/checkURL/checkURL";

function Profile() {
  // const { User } = useRecoilValue(userAuthState);
  const { User } = JSON.parse(localStorage.getItem("data"));
  const [user, setUser] = useState({});
  const [file, setFile] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    _fetchData(User.Code);
  }, []);

  const _fetchData = async code => {
    const result = await profileService.getProfileUser(code);
    console.log(result);
    setUser(result);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    handleUpload();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpload = async () => {
    setLoading(true);
    if (!file) return;
    const storageRef = ref(storage, `avatar/${user.code}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      error => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(downloadURL => {
            console.log(downloadURL);
            return downloadURL;
          })
          .then(url => {
            const res = profileService.updateProfileUser(user.code, url);
            return res;
          })
          .then(() => {
            _fetchData(user.code);
          })
          .then(() => {
            setLoading(false);
          });
      }
    );
  };

  const props = {
    name: "file",
    action: "http://localhost:3000/",
    headers: {
      authorization: "authorization-text"
    },
    multiple: false,
    accept: "image/*",

    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068"
      },
      strokeWidth: 3,
      format: percent => percent && `${parseFloat(percent.toFixed(2))}%`
    },
    beforeUpload: file => {
      setFile(file);
      return false;
    }
  };
  return (
    <Spin spinning={loading} delay={500}>
      <div
        style={{
          padding: 20,
          display: "flex",
          justifyContent: "center",
          fontSize: 16,
          height: "80vh",
          alignItems: "flex-start"
        }}
      >
        <Helmet>
          <meta charSet="utf-8" />
          <title>Profile</title>
        </Helmet>
        <div
          style={{
            width: 600
          }}
        >
          <div style={{ display: "flex", marginBottom: 30 }}>
            {checkURL(user.avatar) ? (
              <Avatar
                onClick={showModal}
                style={{ cursor: "pointer" }}
                size={52}
                src={user.avatar}
              />
            ) : (
              <Avatar
                onClick={showModal}
                style={{ cursor: "pointer" }}
                size={52}
                icon={<UserOutlined />}
              />
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 15
              }}
            >
              <span
                style={{
                  fontSize: 18,
                  marginRight: 5,
                  fontWeight: 500
                }}
              >
                {user?.name}
              </span>
              <span>{user?.code}</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 15
            }}
          >
            <span style={{ color: "#707070" }}>Gender</span>
            <span style={{ fontWeight: 500, color: "#000" }}>
              {user?.gender ? "Male" : "Female"}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 15
            }}
          >
            <span style={{ color: "#707070" }}>Email</span>
            <span style={{ fontWeight: 500, color: "#000" }}>
              {user?.email}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 15
            }}
          >
            <span style={{ color: "#707070" }}>Phone</span>
            <span style={{ fontWeight: 500, color: "#000" }}>
              {user?.phone}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 15
            }}
          >
            <span style={{ color: "#707070" }}>Birthday</span>
            <span style={{ fontWeight: 500, color: "#000" }}>
              {moment(user?.birthday).format("YYYY - MMM - DD")}
            </span>
          </div>
        </div>
        <Modal
          title="Update avatar"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. If you have more, you can
              compress file zip
            </p>
          </Dragger>
        </Modal>
      </div>
    </Spin>
  );
}

export default Profile;
