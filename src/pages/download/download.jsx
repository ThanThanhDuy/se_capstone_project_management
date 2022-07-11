import React, { useState } from "react";
import { Collapse, Divider, Button, Tooltip } from "antd";
import {
  DownloadOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FileZipOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { UilFileInfoAlt, UilFolderDownload } from "@iconscout/react-unicons";
import { FilterListOff } from "@mui/icons-material";
import "./download.scss";
import fileService from "../../services/file";
import { useEffect } from "react";
const { Panel } = Collapse;
function Download() {
  const [listFile, setListFile] = useState(null);

  async function fetchdata() {
    let res = await fileService.getAllFile();
    setListFile(res);
  }

  useEffect(() => {
    fetchdata();
  }, []);

  const handleDownloadAll = async (classDownload, e) => {
    let listDowload = document.getElementsByClassName(classDownload);
    for (let el of listDowload) {
      window.open(el.href);
    }
  };

  const genExtra = path => (
    <abbr title="Download">
      <DownloadOutlined
        className="download"
        onClick={event => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
          window.open(path);
        }}
      />
    </abbr>
  );

  return (
    <div>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>
        <UilFolderDownload color="#008172" style={{ marginRight: 5 }} />
        Download file document
      </h1>
      <Divider style={{ marginBottom: 40 }} />

      {listFile?.map((itemP, index) => (
        <div style={{ marginBottom: 60 }} key={index}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <h1 style={{ fontSize: 20 }}>{itemP.semester_name}</h1>
            <Button
              style={{
                backgroundColor: "#00796a",
                color: "#fff",
                height: "35px",
                width: "140px",
                borderRadius: "10px",
                fontSize: 14,
              }}
              icon={<DownloadOutlined />}
              onClick={e => handleDownloadAll(`s${itemP.semester_id}`, e)}
            >
              Download all
            </Button>
          </div>
          <Collapse expandIconPosition="end">
            {itemP.files.map((item, index) => (
              <>
                <a
                  download
                  className={`s${itemP.semester_id}`}
                  href={item.path}
                  style={{
                    display: "none",
                  }}
                ></a>
                <Panel
                  header={
                    <div>
                      {(item.file_name.includes(".docx") ||
                        item.file_name.includes(".doc")) && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                          }}
                        >
                          <FileWordOutlined style={{ color: "#114aae" }} />
                          <a
                            href={item.path}
                            style={{
                              paddingTop: 2,
                              color: "#44494d",
                              pointerEvents: "none",
                            }}
                          >
                            {item.file_name}
                          </a>
                          <a
                            href={item.path}
                            style={{
                              display: "none",
                            }}
                          ></a>
                        </div>
                      )}
                      {(item.file_name.includes(".xlsx") ||
                        item.file_name.includes(".csv") ||
                        item.file_name.includes(".xls")) && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                          }}
                        >
                          <FileExcelOutlined style={{ color: "#1f6f43" }} />
                          <a
                            href={item.path}
                            style={{
                              paddingTop: 2,
                              color: "#44494d",
                              pointerEvents: "none",
                            }}
                          >
                            {item.file_name}
                          </a>
                        </div>
                      )}
                      {(item.file_name.includes(".rar") ||
                        item.file_name.includes(".zip")) && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                          }}
                        >
                          <FileZipOutlined style={{ color: "#cc9230" }} />
                          <a
                            className={`s${itemP.semester_id}`}
                            href={item.path}
                            style={{
                              paddingTop: 2,
                              color: "#44494d",
                              pointerEvents: "none",
                            }}
                          >
                            {item.file_name}
                          </a>
                        </div>
                      )}
                      {!item.file_name.includes(".rar") &&
                        !item.file_name.includes(".zip") &&
                        !item.file_name.includes(".xlsx") &&
                        !item.file_name.includes(".csv") &&
                        !item.file_name.includes(".xls") &&
                        !item.file_name.includes(".docx") &&
                        !item.file_name.includes(".doc") && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 3,
                            }}
                          >
                            <FileOutlined style={{ color: "#cf9050" }} />
                            <a
                              className={`s${itemP.semester_id}`}
                              href={item.path}
                              style={{
                                paddingTop: 2,
                                color: "#44494d",
                                pointerEvents: "none",
                              }}
                            >
                              {item.file_name}
                            </a>
                          </div>
                        )}
                    </div>
                  }
                  key={index}
                  extra={genExtra(item.path)}
                >
                  <div>
                    <span style={{ fontWeight: 500 }}>Capstone Team: </span>
                    {item.code}
                  </div>
                  <div>
                    <span style={{ fontWeight: 500 }}>Topic: </span>
                    {item.topic_name}
                  </div>
                  <div>
                    <span style={{ fontWeight: 500 }}>Date defence: </span>
                    {item.date_grade}
                  </div>
                </Panel>
              </>
            ))}
          </Collapse>
        </div>
      ))}
    </div>
  );
}

export default Download;
