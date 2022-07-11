import React, { useEffect, useState } from "react";
import { Row, Divider, Select, Spin } from "antd";
import CapstoneTeamCard from "./capstone_team_card.jsx";
import semesterService from "../../services/semester";
import capstoneTeamService from "../../services/capstone_team.js";
import { Helmet } from "react-helmet";
import { UilFire, UilUsersAlt } from "@iconscout/react-unicons";
import "./index.scss";
const CAPSTONE_TEAMS = [
  {
    castone_code: "SU202212",
    progress: 30,
    semester: "Summer 2022",
  },
];
const { Option } = Select;
const Home = () => {
  const [semesters, setSemesters] = useState([]);
  const [semesterItem, setSemesterItem] = useState("");
  const [capstoneTeams, setCapstoneTeams] = useState([]);
  const [capstoneCouncil, setCapstoneCouncil] = useState([]);
  const [semeterId, setSemeterId] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const result = await capstoneTeamService.getCapstoneTeamByCodeSemeter(
      semesterItem
    );
    let data = [];
    result?.capstone_teams.forEach((item, index) => {
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
    let dataCouncil = [];
    result?.councils[0]?.capstone_teams.forEach((item, index) => {
      dataCouncil.push(item);
    });
    let roleTopic = [];
    for (let i of data) {
      roleTopic.push({
        topic_code: i.topic.code,
        role: i.role_id,
      });
    }
    for (let i of dataCouncil) {
      roleTopic.push({
        topic_code: i.topic.code,
        role: i.role_id,
      });
    }
    localStorage.setItem("roleTopic", JSON.stringify(roleTopic));
    setTimeout(() => {
      setCapstoneTeams(data);
      setCapstoneCouncil(dataCouncil);
      setLoading(false);
    }, 1000);
    return result;
  };

  const _handleChangeSemeter = event => {
    setSemesterItem(event);
    let id = semesters.find(item => item.code === event)?.id;
    setSemeterId(id ? id : "");
  };
  return (
    <Spin spinning={loading} delay={100} style={{ height: "100vh" }}>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home</title>
        </Helmet>
        {capstoneCouncil.length > 0 && (
          <>
            <div style={{ marginBottom: 80 }}>
              <h1 style={{ fontSize: 28, marginBottom: 20 }}>
                <UilFire color="#d4380d" style={{ marginRight: 5 }} />
                Capstone project defence
              </h1>
              <Row gutter={20} style={{ gap: 15 }}>
                {capstoneCouncil?.map((item, key) => {
                  return <CapstoneTeamCard key={key} teamItem={item} />;
                })}
              </Row>
            </div>
            {/* <Divider /> */}
          </>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 30,
            marginBottom: 20,
          }}
          className="semester-selector"
        >
          <h1 style={{ fontSize: 28, marginBottom: 0 }}>
            <UilUsersAlt color="#008172" style={{ marginRight: 5 }} />
            Team Overview
          </h1>
          <Select
            style={{
              width: "250px",
            }}
            onChange={_handleChangeSemeter}
            value={semesterItem}
          >
            <Option key={"a"} value={""}>
              All Semeter
            </Option>
            {semesters?.map((item, key) => {
              return (
                <Option key={key} value={item.code}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </div>

        <Row gutter={20} style={{ gap: 15 }}>
          {capstoneTeams?.map((item, key) => {
            return <CapstoneTeamCard key={key} teamItem={item} />;
          })}
        </Row>
      </div>
    </Spin>
  );
};

export default Home;
