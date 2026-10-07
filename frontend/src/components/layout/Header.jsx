function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <button className="mobile-menu-button" type="button">
          ☰
        </button>

        <div>
          <p className="header-eyebrow">CLOUD INFRASTRUCTURE</p>
          <h2>AWS Resource Manager</h2>
        </div>
      </div>

      <div className="header-right">
        <div className="region-selector">
          <span className="region-indicator"></span>
          <span>ap-south-1</span>
        </div>

        <div className="connection-indicator">
          <span className="status-dot"></span>
          <span>Connected</span>
        </div>

        <div className="user-profile">
          <div className="user-avatar">AR</div>

          <div className="user-info">
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;