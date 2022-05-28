import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { CAPSTONE_TEAM_URL, CAPSTONE_COUNCIL_URL } from '../../../constant/url';

function breadcrumb_admin() {
  let location = useLocation();

  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0 0 0' }}>
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
    </div>
  );
}

export default breadcrumb_admin;
