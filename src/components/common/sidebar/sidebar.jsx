import React from 'react';
import { TeamOutlined, AuditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { CAPSTONE_TEAM_URL, CAPSTONE_COUNCIL_URL } from '../../../constant/url';

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
      theme="light"
    >
      <div className="logo" />
      <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item
          key="1"
          style={{
            height: 64,
            fontSize: 16,
            margin: 0,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <TeamOutlined />
          <span>Capstone Team</span>
          <Link to={CAPSTONE_TEAM_URL} />
        </Menu.Item>
        <Menu.Item key="2" style={{ height: 64, fontSize: 16, margin: 0 }}>
          <AuditOutlined />
          <span>Capstone Council</span>
          <Link to={CAPSTONE_COUNCIL_URL} />
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
export default Sidebar;
