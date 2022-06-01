import "./App.css";
import AdminLayout from "./components/layouts/admin";
import Login from "./pages/login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "./components/layouts/user";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="capstone-team/" element={<AdminLayout />} />
        <Route path="capstone-council/" element={<AdminLayout />} />
        <Route path="user/*" element={<UserLayout />} />
        <Route path="user" element={<Navigate to="home" replace />} />
      </Routes>
    </div>
  );
}

export default App;
