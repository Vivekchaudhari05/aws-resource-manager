import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: "▦",
  },
  {
    name: "EC2",
    path: "/ec2",
    icon: "▣",
  },
  {
    name: "S3",
    path: "/s3",
    icon: "◈",
  },
  {
    name: "Resources",
    path: "/resources",
    icon: "◆",
  },
  {
    name: "Activity",
    path: "/activity",
    icon: "◷",
  },
  {
    name: "Settings",
    path: "/settings",
    icon: "⚙",
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">AWS</div>

        <div className="brand-content">
          <h1>AWS Resource</h1>
          <span>Manager</span>
        </div>
      </div>

      <nav className="sidebar-navigation">
        <div className="navigation-label">MAIN MENU</div>

        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `navigation-item ${isActive ? "active" : ""}`
            }
          >
            <span className="navigation-icon">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="aws-status">
          <span className="status-dot"></span>

          <div>
            <strong>AWS Connected</strong>
            <span>Ready to manage</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;