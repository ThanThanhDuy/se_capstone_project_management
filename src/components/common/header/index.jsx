import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const settings = ["Hồ sơ", "Bảng điều khiển", "Đăng xuất"];

const Header = () => {
  const [_anchorElUser, _setAnchorElUser] = useState(false);
  const _handleOpenUserMenu = (event) => {
    _setAnchorElUser(true);
  };

  const _handleCloseUserMenu = () => {
    _setAnchorElUser(false);
  };

  return (
    <AppBar sx={{ bgcolor: "#00796a" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FAP - FPT University
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />
          <Box>
            <Tooltip placement="right" title="Open settings">
              <IconButton onClick={_handleOpenUserMenu} sx={{ p: 1 }}>
                <Typography
                  variant="h9"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 1,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    letterSpacing: ".1rem",
                    color: "white",
                    textDecoration: "none",
                    fontSize: "1.5vh",
                  }}
                >
                  Nguyễn Đăng Khoa
                </Typography>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={_anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={_anchorElUser}
              onClose={_handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={_handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
