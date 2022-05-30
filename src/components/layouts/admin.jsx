import React from 'react';
import SidebarAdmin from '../common/sidebar/sidebar';
import HeaderAdmin from '../common/header/index';
import BreadCrumbAdmin from '../common/breadcrumb/breadcrumb_admin';
import MainContentsAdmin from '../main_contents_admin/main_contents_admin';
import { Layout } from 'antd';

const { Content } = Layout;

const AdminLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }} theme="light">
      <HeaderAdmin />
      <Layout className="site-layout">
        <SidebarAdmin />
        <Content style={{ margin: '0 16px' }}>
          <BreadCrumbAdmin />
          <MainContentsAdmin />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
