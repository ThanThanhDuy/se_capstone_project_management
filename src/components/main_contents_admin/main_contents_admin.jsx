import React from 'react';
import CapstoneTeam from '../../pages/capstone_team/capstone_team';
import CapstoneCouncil from '../../pages/capstone_council/capstone_council';
import { CAPSTONE_TEAM_URL, CAPSTONE_COUNCIL_URL } from '../../constant/url';
import { useLocation } from 'react-router-dom';

function main_contents_admin() {
  let location = useLocation();

  return (
    <div
      className="site-layout-background"
      style={{
        minHeight: 360
      }}
    >
      {location.pathname === CAPSTONE_TEAM_URL && <CapstoneTeam />}
      {location.pathname === CAPSTONE_COUNCIL_URL && <CapstoneCouncil />}
    </div>
  );
}

export default main_contents_admin;
