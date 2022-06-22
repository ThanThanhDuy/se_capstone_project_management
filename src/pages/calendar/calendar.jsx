import React from "react";
import { useRecoilValue } from "recoil";
import { rowSelectedCapstoneCouncilState } from "../../../store/table/table";
import { Table } from "antd";
function Calendar() {
  const _rowSelected = useRecoilValue(rowSelectedCapstoneCouncilState);
  console.log(_rowSelected);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: 100,
      fixed: "left"
    },
    {
      title: "Topic Id",
      dataIndex: "topic_code",
      key: "topic_code",
      width: 100,
      fixed: "left"
    },
    {
      title: "Topic Name",
      key: "topic_name",
      dataIndex: "topic_name",
      width: 600,
      fixed: "left"
    },
    {
      title: "Mentors",
      dataIndex: "mentor",
      key: "mentor",
      width: 300,
      fixed: "left"
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 150
      // fixed: "left"
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      width: 150
      // fixed: "left"
    }
  ];
  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 20, marginTop: 10, marginBottom: 30 }}>
        Location: <span style={{ color: "red" }}>{_rowSelected.location}</span>
      </h1>
      <Table
        columns={columns}
        dataSource={_rowSelected?.topic}
        rowKey={obj => obj["topic_code"]}
        scroll={{ x: 1100 }}
        pagination={false}
      />
    </div>
  );
}

export default Calendar;
