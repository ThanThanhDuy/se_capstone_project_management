import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  // const { auth } = useAuth();
  // const auth = useRecoilValue(userAuthState);
  const auth = JSON.parse(localStorage.getItem("data"));

  const location = useLocation();
  return auth?.User ? (
    auth?.User?.Roles?.find(role => allowedRoles?.includes(role.RoleId)) ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    )
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
