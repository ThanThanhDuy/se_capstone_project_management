import React from "react";
import { useRecoilValue } from "recoil";
import { rowSelectedCapstoneCouncilState } from "../../../store/table/table";
import { Table } from "antd";
function Calendar() {
  const _rowSelected = useRecoilValue(rowSelectedCapstoneCouncilState);
  console.log(_rowSelected);

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      width: 100,
      fixed: "left"
    },
    {
      title: "Mã đề tài",
      dataIndex: "Mã đề tài",
      key: "Mã đề tài",
      width: 100,
      fixed: "left"
    },
    {
      title: "Tên đề tài",
      key: "Tên đề tài",
      dataIndex: "Tên đề tài",
      width: 600,
      fixed: "left"
    },
    {
      title: "Giảng viên hướng dẫn",
      dataIndex: "Giảng viên hướng dẫn",
      key: "Giảng viên hướng dẫn",
      width: 300,
      fixed: "left"
    },
    {
      title: "Ngày",
      dataIndex: "Ngày",
      key: "Ngày",
      width: 150
      // fixed: "left"
    },
    {
      title: "Giờ",
      dataIndex: "Giờ",
      key: "Giờ",
      width: 150
      // fixed: "left"
    }
  ];
  return (
    <div style={{ padding: 20 }}>
      <Table
        columns={columns}
        dataSource={_rowSelected?.topic}
        rowKey={obj => obj["Mã đề tài"]}
        scroll={{ x: 1100 }}
      />
    </div>
  );
}

export default Calendar;
