import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { CAPSTONE_TEAM_URL, CAPSTONE_COUNCIL_URL } from "../../../constant/url";

function BreadcrumbAdmin() {
  let location = useLocation();
  return (
    <div>
      <Breadcrumb style={{ margin: "16px 0 0 0" }}>
        <Breadcrumb.Item>FAP</Breadcrumb.Item>
        {location.pathname.includes(CAPSTONE_TEAM_URL) && (
          <Breadcrumb.Item>
            <Link to={CAPSTONE_TEAM_URL}>Capstone Team</Link>
          </Breadcrumb.Item>
        )}
        {location.pathname.includes(CAPSTONE_COUNCIL_URL) &&
          (location.pathname.split("/").length === 4 ? (
            <>
              <Breadcrumb.Item>
                <Link to={CAPSTONE_COUNCIL_URL}>Capstone Council</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                {location.pathname.split("/")[3]}
              </Breadcrumb.Item>
            </>
          ) : (
            <Breadcrumb.Item>Capstone Council</Breadcrumb.Item>
          ))}
        {location.pathname.includes("profile") && (
          <Breadcrumb.Item>
            <Link to={CAPSTONE_TEAM_URL}>Profile</Link>
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
    </div>
  );
}

export default BreadcrumbAdmin;
