import React from "react";
import { Row, Divider } from "antd";
import CapstoneTeamCard from "./capstone_team_card.jsx";
const CAPSTONE_TEAMS = [
  {
    castone_code: "SU202212",
    progress: 30,
    semester: "Summer 2022"
  }
];
const Home = () => {
  return (
    <div>
      <Divider>Course Overview</Divider>

      <Row style={{ gap: 20 }}>
        <CapstoneTeamCard />
        <CapstoneTeamCard />
        <CapstoneTeamCard />
      </Row>
    </div>
  );
};

export default Home;
