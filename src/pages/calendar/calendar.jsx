import React from "react";
import { Table } from "antd";
import { useState } from "react";
import capstoneCouncilService from "../../services/capstone_council";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
function Calendar() {
  // const _rowSelected = useRecoilValue(rowSelectedCapstoneCouncilState);
  // console.log(_rowSelected);

  let param = useParams();

  const [result, setResult] = useState({});

  async function fetchData(code) {
    const res = await capstoneCouncilService.getCapstoneCouncilByCodeCouncil(
      param.councilCode
    );
    setResult(res);
  }

  useEffect(() => {
    fetchData("SPC2022C1");
  }, []);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: 100,
      fixed: "left",
    },
    {
      title: "Topic Code",
      dataIndex: "topic_code",
      key: "topic_code",
      width: 100,
      fixed: "left",
    },
    {
      title: "Topic Name",
      key: "topic_name",
      dataIndex: "topic_name",
      width: 600,
      fixed: "left",
    },
    {
      title: "Mentors",
      dataIndex: "mentors",
      key: "mentors",
      width: 300,
      fixed: "left",
    },
    {
      title: "Date",
      dataIndex: "date_grade",
      key: "date_grade",
      width: 150,
      // fixed: "left"
    },
    {
      title: "Defence Type",
      dataIndex: "type",
      key: "type",
      width: 150,
      // fixed: "left"
    },
  ];
  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 20, marginTop: 10, marginBottom: 30 }}>
        Location: <span style={{ color: "red" }}>{result?.room_name}</span>
      </h1>
      <Table
        columns={columns}
        dataSource={result?.topics}
        rowKey={obj => obj["topic_code"]}
        scroll={{ x: 1100 }}
        pagination={false}
      />
    </div>
  );
}

export default Calendar;
