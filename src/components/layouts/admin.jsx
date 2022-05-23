import React from "react";
import { Box } from "@mui/material";
import "./style.css";
import { makeStyles } from "@mui/styles";
import Header from "../common/header";
import Sidebar from "../common/sidebar/sidebar";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateRows: "auto 1fr",
    gridTemplateColumns: "270px 1fr",
    gridTemplateAreas: `"header header" "sidebar main"`,
    minHeight: "100vh",
  },
  header: {
    gridArea: "header",
  },
  sidebar: {
    gridArea: "sidebar",
    borderRight: `1px solid rgb(0 0 0 / 12%)`,
  },
  main: {
    gridArea: "main",
    padding: "10px",
  },
}));
const AdminLayout = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header></Header>
      </Box>
      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box className={classes.main}>Main</Box>
    </Box>
  );
};

export default AdminLayout;
