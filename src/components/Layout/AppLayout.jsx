import { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  GitBranch,
  ClipboardCheck,
  Video,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  Zap,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/jobs', label: 'Jobs', icon: Briefcase },
  { to: '/candidates', label: 'Candidates', icon: Users },
  { to: '/pipeline', label: 'Pipeline', icon: GitBranch },
  { to: '/assessments', label: 'Assessments', icon: ClipboardCheck },
  { to: '/interviews', label: 'Interviews', icon: Video },
  { to: '/communication', label: 'Communication', icon: MessageSquare },
  { to: '/settings', label: 'Settings', icon: Settings },
];

const pageTitles = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview of recruitment activity' },
  '/jobs': { title: 'Jobs', subtitle: 'Manage open positions' },
  '/jobs/new': { title: 'Create New Job', subtitle: 'Add a new job opening' },
  '/candidates': { title: 'Candidates', subtitle: 'Manage your candidate pipeline' },
  '/pipeline': { title: 'Candidate Pipeline', subtitle: 'Kanban view of candidate stages' },
  '/assessments': { title: 'Assessments', subtitle: 'Track candidate assessments' },
  '/interviews': { title: 'Interviews', subtitle: 'Track candidate interviews' },
  '/communication': { title: 'Communication', subtitle: 'Messages and notifications' },
  '/settings': { title: 'Settings', subtitle: 'Application settings' },
};

export default function AppLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentPage = pageTitles[location.pathname] || { title: 'EasyHire', subtitle: '' };

  // For candidate detail pages
  if (location.pathname.startsWith('/candidates/') && location.pathname !== '/candidates') {
    currentPage.title = 'Candidate Details';
    currentPage.subtitle = 'Detailed candidate profile';
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Zap size={20} color="#fff" />
          </div>
          <div>
            <div className="sidebar-logo-text">EasyHire</div>
            <div className="sidebar-logo-sub">AI Recruitment</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section">
            <div className="sidebar-section-title">Main</div>
          </div>
          {navItems.slice(0, 4).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-link${isActive ? ' active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}

          <div className="sidebar-section">
            <div className="sidebar-section-title">Evaluation</div>
          </div>
          {navItems.slice(4, 6).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-link${isActive ? ' active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}

          <div className="sidebar-section">
            <div className="sidebar-section-title">Other</div>
          </div>
          {navItems.slice(6).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-link${isActive ? ' active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">{user?.avatar || 'U'}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.name || 'User'}</div>
              <div className="sidebar-user-role">{user?.role || 'Recruiter'}</div>
            </div>
            <button
              className="btn btn-ghost btn-icon"
              onClick={handleLogout}
              title="Logout"
              style={{ color: 'var(--color-gray-400)' }}
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 99,
          }}
        />
      )}

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div className="header-left">
            <button
              className="btn btn-ghost btn-icon mobile-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="header-title">
              <h1>{currentPage.title}</h1>
              {currentPage.subtitle && (
                <div className="header-subtitle">{currentPage.subtitle}</div>
              )}
            </div>
          </div>
          <div className="header-right">
            <button className="btn btn-ghost btn-icon header-notification">
              <Bell size={20} />
              <span className="header-notification-dot" />
            </button>
          </div>
        </header>

        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
