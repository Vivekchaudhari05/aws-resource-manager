import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout() {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="main-wrapper">
        <Header />

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;