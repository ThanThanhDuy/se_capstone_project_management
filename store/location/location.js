import { useLocation } from "react-router-dom";
import { atom } from "recoil";

export const locationState = atom({
  key: "location",
  default: {
    pathname: "/admin/capstone-team"
  }
});
