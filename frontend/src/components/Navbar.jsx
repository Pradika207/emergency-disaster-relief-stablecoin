import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import WalletConnect from './WalletConnect';
import { Menu, X, Heart } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/donor', label: 'Donor' },
    { path: '/beneficiary', label: 'Beneficiary' },
    { path: '/admin', label: 'Admin' },
    { path: '/transparency', label: 'Transparency' },
    { path: '/profile', label: 'Profile' },
    { path: '/wallet-status', label: 'Wallet' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <Heart size={24} style={{ color: '#ef4444' }} />
          ReliefCoin
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-links" style={{ display: 'flex', gap: '20px', listStyle: 'none' }}>
          {navLinks.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={isActive(link.path) ? 'active' : ''}
                style={{
                  textDecoration: 'none',
                  fontWeight: '600',
                  color: isActive(link.path) ? '#4f46e5' : '#6b7280',
                  borderBottom: isActive(link.path) ? '2px solid #4f46e5' : 'none',
                  paddingBottom: isActive(link.path) ? '4px' : '0',
                  transition: 'all 0.3s ease'
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Wallet Connect */}
        <WalletConnect />
      </div>
    </nav>
  );
}
