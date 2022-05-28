import React from 'react'
import CapstoneTeam from '../../../pages/capstone_team/capstone_team'
import CapstoneCouncil from '../../../pages/capstone_council/capstone_council'
import {
  PieChartOutlined,
  UserOutlined,
  DesktopOutlined,
  TeamOutlined,
  AuditOutlined
} from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, Avatar, Popover } from 'antd'
import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
const { Header, Content, Sider } = Layout
const CAPSTONE_TEAM_URL = '/capstone-team'
const CAPSTONE_COUNCIL_URL = '/capstone-council'

const content = (
  <div style={{ padding: '0 10px' }}>
    <a style={{ display: 'block', marginBottom: 10, fontSize: 16 }}>
      View Profile
    </a>
    <a href="" style={{ color: '#d4380d', fontSize: 16 }}>
      Log out
    </a>
  </div>
)

const Sidebar = () => {
  let location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout
      style={{
        minHeight: '100vh'
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
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
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: '0 15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <span style={{ color: '#fff', fontSize: 28 }}>FAP - FPT</span>
          </div>
          <div style={{ cursor: 'pointer' }}>
            <Popover content={content}>
              <span style={{ color: '#fff', marginRight: 10, fontSize: 16 }}>
                Nguyễn Đăng Khoa
              </span>
              <Avatar size="large" icon={<UserOutlined />} />
            </Popover>
          </div>
        </Header>
        <Content
          style={{
            margin: '0 16px'
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0 0 0'
            }}
          >
            <Breadcrumb.Item>FAP</Breadcrumb.Item>
            {location.pathname === CAPSTONE_TEAM_URL && (
              <Breadcrumb.Item>
                <Link to={CAPSTONE_TEAM_URL}>Capstone Team</Link>
              </Breadcrumb.Item>
            )}
            {location.pathname === CAPSTONE_COUNCIL_URL && (
              <Breadcrumb.Item>
                <Link to={CAPSTONE_TEAM_URL}>Capstone Council</Link>
              </Breadcrumb.Item>
            )}
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              minHeight: 360
            }}
          >
            {location.pathname === CAPSTONE_TEAM_URL && <CapstoneTeam />}
            {location.pathname === CAPSTONE_COUNCIL_URL && <CapstoneCouncil />}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
export default Sidebar
