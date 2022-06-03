import { Card, Progress } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const CapstoneTeamCard = () => {
  return (
    <div>
      <Card
        extra={<Link to="/user/report">More</Link>}
        title="team_code"
        style={{
          width: 300
        }}
      >
        <p>Topic</p>
        <Progress percent={30} />
      </Card>
    </div>
  );
};

export default CapstoneTeamCard;
