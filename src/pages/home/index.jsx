import React, { useEffect, useState } from "react";
import { Row, Divider, Select } from "antd";
import CapstoneTeamCard from "./capstone_team_card.jsx";
import semesterService from "../../services/semester";
import capstoneTeamService from "../../services/capstone_team.js";
import { Helmet } from "react-helmet";
const CAPSTONE_TEAMS = [
  {
    castone_code: "SU202212",
    progress: 30,
    semester: "Summer 2022"
  }
];
const { Option } = Select;
const Home = () => {
  const [semesters, setSemesters] = useState([]);
  const [semesterItem, setSemesterItem] = useState("");
  const [capstoneTeams, setCapstoneTeams] = useState([]);
  const [semeterId, setSemeterId] = useState("");
  useEffect(() => {
    _fetchDataSemeter();
    _fetchCapstoneTeam(semesterItem);
  }, [semesterItem]);

  const _fetchDataSemeter = async () => {
    const result = await semesterService.getAllSemester();
    setSemesters(result);

    return result;
  };
  const _fetchCapstoneTeam = async () => {
    const result = await capstoneTeamService.getCapstoneTeamByCodeSemeter(
      semesterItem
    );
    let data = [];
    result?.forEach((item, index) => {
      if (semeterId) {
        if (item.semester_id === parseInt(semeterId)) {
          item.capstone_teams.forEach((item2, index) => {
            data.push(item2);
          });
        }
      } else {
        item.capstone_teams.forEach((item2, index) => {
          data.push(item2);
        });
      }
    });
    console.log(data);
    setCapstoneTeams(data);

    return result;
  };

  const _handleChangeSemeter = event => {
    setSemesterItem(event);
    let id = semesters.find(item => item.code === event)?.id;
    setSemeterId(id ? id : "");
  };
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      <Divider>Course Overview</Divider>
      <Select
        style={{
          width: "250px",
          marginBottom: "20px"
        }}
        onChange={_handleChangeSemeter}
        value={semesterItem}
      >
        <Option key={"a"} value={""}>
          All
        </Option>
        {semesters?.map((item, key) => {
          return (
            <Option key={key} value={item.code}>
              {item.name}
            </Option>
          );
        })}
      </Select>
      <Row style={{ gap: 20 }}>
        {capstoneTeams?.map((item, key) => {
          return <CapstoneTeamCard key={key} teamItem={item} />;
        })}
      </Row>
    </div>
  );
};

export default Home;
