import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Avatar, Popover } from 'antd';

const { Header } = Layout;

const Content = (
  <div style={{ padding: '0 10px' }}>
    <a style={{ display: 'block', marginBottom: 10, fontSize: 16 }}>
      View Profile
    </a>
    <a href="" style={{ color: '#d4380d', fontSize: 16 }}>
      Log out
    </a>
  </div>
);

const HeaderAdmin = () => {
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#00796a'
      }}
    >
      <div>
        <span style={{ color: '#fff', fontSize: 28 }}>
          FAP - FPT University
        </span>
      </div>
      <div style={{ cursor: 'pointer' }}>
        <Popover content={Content}>
          <span style={{ color: '#fff', marginRight: 10, fontSize: 16 }}>
            Nguyễn Đăng Khoa
          </span>
          <Avatar size="large" icon={<UserOutlined />} />
        </Popover>
      </div>
    </Header>
  );
};
export default HeaderAdmin;
