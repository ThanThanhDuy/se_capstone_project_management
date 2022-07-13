const STATUS_MAPPING = {
  0: {
    color: "green",
    text: "Finish",
  }, // not pass
  1: {
    color: "geekblue",
    text: "Processing",
  }, // processing
  // 2: {
  //   color: "green",
  //   text: "Pass"
  // }, // pass
  mentor: {
    colorBG: "#e6fffb",
    text: "MENTOR",
    colorPM: "#08979c",
  },
  grade: {
    colorBG: "#fff0f6",
    text: "GRADE",
    colorPM: "#c41d7f",
  },
};

export default STATUS_MAPPING;
