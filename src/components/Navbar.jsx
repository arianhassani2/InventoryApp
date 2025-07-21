// src/components/Navbar.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar bg-base-100 shadow-sm">
      {/* ─── Navbar Start (logo + mobile menu) ─── */}
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          StockWave
        </Link>
        {/* mobile dropdown */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg"
                 className="h-5 w-5"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li><Link to="/item1">Item 1</Link></li>
            <li>
              <button className="justify-between">Parent</button>
              <ul className="p-2">
                <li><Link to="/submenu1">Submenu 1</Link></li>
                <li><Link to="/submenu2">Submenu 2</Link></li>
              </ul>
            </li>
            <li><Link to="/item3">Item 3</Link></li>
          </ul>
        </div>
      </div>

      {/* ─── Navbar Center (tabs on desktop) ─── */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/item1">Item 1</Link></li>
          <li><Link to="/item2">Item 2</Link></li>
          <li><Link to="/item3">Item 3</Link></li>
        </ul>
      </div>

      {/* ─── Navbar End (search + avatar) ─── */}
      <div className="navbar-end">
        <div className="flex gap-2 items-center">
          {/* search box */}
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />

          {/* user avatar dropdown */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="User avatar"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile<span className="badge">New</span>
                </Link>
              </li>
              <li><Link to="/settings">Settings</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
