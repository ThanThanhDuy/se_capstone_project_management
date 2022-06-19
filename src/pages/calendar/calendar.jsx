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
      dataIndex: "STT",
      key: "STT",
      width: 100,
      fixed: "left"
    },
    {
      title: "Topic Id",
      dataIndex: "Mã đề tài",
      key: "Mã đề tài",
      width: 100,
      fixed: "left"
    },
    {
      title: "Topic Name",
      key: "Tên đề tài",
      dataIndex: "Tên đề tài",
      width: 600,
      fixed: "left"
    },
    {
      title: "Mentors",
      dataIndex: "Giảng viên hướng dẫn",
      key: "Giảng viên hướng dẫn",
      width: 300,
      fixed: "left"
    },
    {
      title: "Date",
      dataIndex: "Ngày",
      key: "Ngày",
      width: 150
      // fixed: "left"
    },
    {
      title: "Time",
      dataIndex: "Giờ",
      key: "Giờ",
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
        rowKey={obj => obj["Mã đề tài"]}
        scroll={{ x: 1100 }}
        pagination={false}
      />
    </div>
  );
}

export default Calendar;
