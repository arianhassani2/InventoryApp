import { Navigate, Outlet, useLocation } from 'react-router-dom';

function isAuthenticated() {
  return !!localStorage.getItem('token') && !!localStorage.getItem('user');
}

export default function ProtectedRoute() {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
