import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HOME_URL } from "../../../constant/url";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Layout } from "antd";
import { TreeView, TreeItem } from "@mui/lab";
const { Sider } = Layout;
import "./index.css";

const UserSidebar = () => {
  let navigate = useNavigate();
  return (
    <Sider
      width={300}
      style={{
        width: "100%",
        borderRight: "1px solid rgb(0 0 0 / 12%)",
        padding: "10px",
      }}
      theme="light"
    >
      <TreeView
        aria-label="multi-select"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
        sx={{
          height: "fit-content",
          flexGrow: 1,
          maxWidth: 400,
          overflowY: "auto",
        }}
      >
        <TreeItem
          nodeId="1"
          label="Dashboard"
          onClick={() => {
            navigate("/user/home");
          }}
        ></TreeItem>
        <TreeItem nodeId="5" label="Capstone Team">
          <TreeItem nodeId="6" label="Summer123">
            <TreeItem nodeId="7" label="team 1">
              <TreeItem nodeId="8" label="reports" />
              <TreeItem nodeId="9" label="grades" />
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </TreeView>
    </Sider>
  );
};
export default UserSidebar;
