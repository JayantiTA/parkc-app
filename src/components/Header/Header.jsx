import React from 'react';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#32005c' }}>
      <div className="navbar-brand text-center mx-5" href="#" style={{ color: '#E0E1ED', fontSize: 25 }}>
        <img src="/images/logo.png" width="50" height="50" className="d-inline-block align-center mx-3" alt="" />
        Parking Counter
      </div>
      <div className="navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active mx-2" aria-current="page" href="/" style={{ color: '#E0E1ED', fontSize: 17 }}>Maps</a>
          </li>
          <li className="nav-item">
            <a className="nav-link mx-2" href="/table" style={{ color: '#E0E1ED', fontSize: 17 }}>Table</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
