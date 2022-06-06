import "./App.css";
import AdminLayout from "./components/layouts/admin";
import Login from "./pages/login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "./components/layouts/user";
import { userState } from "../store/user/user";
import { useRecoilValue } from "recoil";
import MainLayout from "./components/layouts/main_layout";
import Unauthorized from "./components/unauthorized/unauthorized";
import RequireAuth from "./utils/require_auth/require_auth";
import CapstoneTeam from "./pages/capstone_team/capstone_team";
import CapstoneCouncil from "./pages/capstone_council/capstone_council";
import HomeUser from "./pages/home/index";
import ReportUser from "./pages/report/user_report";
import ReportDetailUser from "./pages/detail_report/detail_report";
import Missing from "./pages/missing/missing";
import ROLES from "./constant/role";

function App() {
  const user = useRecoilValue(userState);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          {/* private routes */}
          {/* admin */}
          <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                <Route
                  index
                  element={<Navigate to="capstone-team" replace />}
                />
              </Route>
              <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                <Route path="capstone-team" element={<CapstoneTeam />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                <Route path="capstone-council" element={<CapstoneCouncil />} />
              </Route>
            </Route>
          </Route>
          {/* user */}
          {/* <Route
            element={
              <RequireAuth allowedRoles={[ROLES.STUDENT, ROLES.TEACHER]} />
            }
          >
            <Route path="user" element={<UserLayout />}>
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.STUDENT, ROLES.TEACHER]} />
                }
              >
                <Route index element={<Navigate to="home" replace />} />
              </Route>
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.STUDENT, ROLES.TEACHER]} />
                }
              >
                <Route path="home" element={<HomeUser />} />
              </Route>
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.STUDENT, ROLES.TEACHER]} />
                }
              >
                <Route path="report" element={<ReportUser />}></Route>
              </Route>
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.STUDENT, ROLES.TEACHER]} />
                }
              >
                <Route path="report/:reportId" element={<ReportDetailUser />} />
              </Route>
            </Route>
          </Route> */}
          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
