import { Outlet, useLocation } from "react-router-dom";
import Header from "./header";

export default function PublicLayout() {
  const location = useLocation();
  
  // Hide header on auth pages (login, register, reset-password)
  const isAuthPage = location.pathname.endsWith('/login') || 
                     location.pathname.endsWith('/register') || 
                     location.pathname.endsWith('/reset-password');

  return (
    <>
      {!isAuthPage && <Header />}
      <Outlet />
    </>
  );
}
