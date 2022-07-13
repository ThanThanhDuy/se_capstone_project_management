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
import Profile from "./pages/profile/profile";
import Calendar from "./pages/calendar/calendar";
import LectureGrade from "./pages/lecture_grade/lecture_grade";
import AdminGrade from "./pages/grade/admin_grade";
import Download from "./pages/download/download";
import ROLES from "./constant/role";

function App() {
  const user = useRecoilValue(userState);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* public routes */}
          <Route index element={<Navigate to="/login" replace />} />
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
              <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                <Route
                  path="capstone-council/:councilCode"
                  element={<Calendar />}
                />
              </Route>
              <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                <Route
                  path="capstone-team/:teamCode"
                  element={<AdminGrade />}
                />
              </Route>
              <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>
          </Route>
          {/* user */}
          <Route
            element={
              <RequireAuth allowedRoles={[ROLES.STUDENT, ROLES.LECTURE]} />
            }
          >
            <Route path="user" element={<UserLayout />}>
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.STUDENT, ROLES.LECTURE]} />
                }
              >
                <Route index element={<Navigate to="home" replace />} />
              </Route>
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.STUDENT, ROLES.LECTURE]} />
                }
              >
                <Route path="home" element={<HomeUser />} />
              </Route>
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.STUDENT, ROLES.LECTURE]} />
                }
              >
                <Route
                  path="report/:capstoneTeamId"
                  element={<ReportUser />}
                ></Route>
              </Route>
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.STUDENT, ROLES.LECTURE]} />
                }
              >
                <Route
                  path="report/:capstoneTeamId/detail/:reportCode"
                  element={<ReportDetailUser />}
                />
              </Route>
              <Route element={<RequireAuth allowedRoles={[ROLES.LECTURE]} />}>
                <Route
                  path="lecture-grade/:reportCode"
                  element={<LectureGrade />}
                />
              </Route>
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.STUDENT, ROLES.LECTURE]} />
                }
              >
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={[ROLES.LECTURE]} />}>
                <Route path="download" element={<Download />} />
              </Route>
            </Route>
          </Route>
          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
