import { Card, Progress } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAuthState } from "../../../store/user/user";
import ROLES from "../../constant/role";
const CapstoneTeamCard = () => {
  const userAuth = useRecoilValue(userAuthState);
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (
      userAuth?.User?.Roles?.find((role) =>
        [ROLES.LECTURE].includes(role.RoleId)
      )
    ) {
      setUrl("/user/lecture-grade");
    } else if (
      userAuth?.User?.Roles?.find((role) =>
        [ROLES.STUDENT].includes(role.RoleId)
      )
    ) {
      setUrl("/user/report");
    }
  }, []);

  return (
    <div>
      <Card
        className="card"
        extra={<Link to={url}>View</Link>}
        title="team_code "
        style={{
          width: 300,
        }}
      >
        - The job managemnet
        <p>Descrption topic</p>
        <Progress percent={30} />
      </Card>
    </div>
  );
};

export default CapstoneTeamCard;
