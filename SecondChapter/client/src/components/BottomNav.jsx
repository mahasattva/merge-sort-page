import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/discover',  label: 'Discover' },
  { to: '/matches',   label: 'Matches'  },
  { to: '/messages',  label: 'Messages' },
  { to: '/profile',   label: 'Profile'  },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {NAV_ITEMS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
