import React from "react";
import HeaderAdmin from "../common/header/index";
import { Layout } from "antd";
import UserSidebar from "../common/user_sidebar";
import { Route, Routes } from "react-router-dom";
import { HOME_URL } from "../../constant/url";
import Home from "../../pages/home/";
const { Content } = Layout;

const UserLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }} theme="light">
      <HeaderAdmin />
      <Layout className="site-layout">
        <UserSidebar />
        <Content style={{ margin: "0 16px" }}>
          <Routes>
            <Route
              path={HOME_URL}
              render={() => <Redirect to="user/home" />}
              element={<Home />}
            />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
