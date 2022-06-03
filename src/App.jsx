import "./App.css";
import AdminLayout from "./components/layouts/admin";
import Login from "./pages/login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "./components/layouts/user";
import { userState } from "../store/user/user";
import { useRecoilValue } from "recoil";

function App() {
  const user = useRecoilValue(userState);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login />} />
        {user && user.user.role === 1 && (
          <>
            <Route path="capstone-team/" element={<AdminLayout />} />
            <Route path="capstone-council/" element={<AdminLayout />} />
          </>
        )}
        {(user && user.user.role === 2) ||
          (user && user.user.role === 3 && (
            <>
              <Route path="user/*" element={<UserLayout />} />
              <Route path="user" element={<Navigate to="home" replace />} />
            </>
          ))}
        <Route path="*" element={<Navigate to="login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
