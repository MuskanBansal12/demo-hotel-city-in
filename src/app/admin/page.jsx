<div className="admin-shell admin-layout">
  <aside className="admin-sidebar">
    <div className="admin-brand">CITY IN<em>.</em></div>

    <p className="admin-sidebar-label">MAIN MENU</p>

    <nav className="admin-nav">
      {navigation.map(item => {
        const Icon = item.icon;
        return (
          <button
            key={item.name}
            className={tab === item.name ? 'active' : ''}
            onClick={() => setTab(item.name)}
          >
            <Icon size={18} />
            {item.name}
          </button>
        );
      })}
    </nav>

    <div className="admin-exit">
      <button onClick={() => window.location.href = '/'}>
        <LogOut size={17} /> Exit Demo
      </button>
    </div>
  </aside>

  <main className="admin-main">
    {/* Move your existing admin-top header here */}
    {/* Keep all five existing tab conditional sections here */}
    {/* Keep your existing footer here */}
  </main>
</div>