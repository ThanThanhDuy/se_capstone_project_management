import { Card, Tag } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./capstone_team_card.scss";
import ROLES from "../../constant/role";
import STATUS_MAPPING from "../../constant/color";
const CapstoneTeamCard = ({ teamItem }) => {
  const userAuth = JSON.parse(localStorage.getItem("data"));
  console.log(teamItem);
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (
      userAuth?.User?.Roles?.find(role => [ROLES.LECTURE].includes(role.RoleId))
    ) {
      setUrl("/user/lecture-grade");
    } else if (
      userAuth?.User?.Roles?.find(role => [ROLES.STUDENT].includes(role.RoleId))
    ) {
      setUrl("/user/report/" + teamItem.code);
    }
  }, [teamItem]);

  return (
    <div>
      <Card
        className="card"
        extra={<Link to={url}>View</Link>}
        title={teamItem.code}
        style={{
          width: 350
        }}
      >
        <span className="topic_title">{teamItem.topic.name}</span>
        <p className="topic_description">{teamItem.topic.description}</p>

        <Tag color={STATUS_MAPPING[teamItem.status].color}>
          {STATUS_MAPPING[teamItem.status].text.toUpperCase()}
        </Tag>
      </Card>
    </div>
  );
};

export default CapstoneTeamCard;
