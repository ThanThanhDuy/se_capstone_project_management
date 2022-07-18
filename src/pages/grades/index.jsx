import React, { useEffect } from "react";
import {
  Breadcrumb,
  Typography,
  Table,
  Tag,
  Button,
  message,
  Upload,
  Spin,
} from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import convertCSV from "../../utils/convertCSV/convertCSV_team";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  dataCapstoneTeamState,
  rowSelectedCapstoneTeamState,
} from "../../../store/table/table";
import { useNavigate } from "react-router-dom";
import STATUS_MAPPING from "../../constant/color";
import axios from "axios";
import { Helmet } from "react-helmet";
import Papa from "papaparse";
import gradeService from "../../services/grade";

function Grades() {
  const [_data, _setData] = useRecoilState(dataCapstoneTeamState);

  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 120,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 120,
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      width: 120,
    },
  ];
  async function _fetchData() {
    const res = await gradeService.getDetailGrades();
    _setData(res);
  }

  useEffect(() => {
    setLoading(true);
    _fetchData();
    setLoading(false);
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <Helmet>
          <meta charSet="utf-8" />
          <title>Detail Grade</title>
        </Helmet>
      </div>
      <Button
        type="primary"
        icon={<EditOutlined />}
        style={{ marginBottom: 20 }}
      >
        Edit
      </Button>
      <Table
        columns={columns}
        dataSource={_data}
        rowKey={(obj) => obj.index}
        loading={loading}
        pagination={{ defaultPageSize: 10 }}
      />
    </>
  );
}

export default Grades;
