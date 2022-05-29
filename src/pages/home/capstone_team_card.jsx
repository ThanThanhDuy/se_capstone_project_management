import { Card, Progress } from "antd";
import React from "react";

const CapstoneTeamCard = () => {
  return (
    <div>
      <Card
        extra={<a href="/a">More</a>}
        title="team_code"
        style={{
          width: 300,
        }}
      >
        <p>Topic</p>
        <Progress percent={30} />
      </Card>
    </div>
  );
};

export default CapstoneTeamCard;
