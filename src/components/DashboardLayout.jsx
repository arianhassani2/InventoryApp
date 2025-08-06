import React from 'react'
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom'
import {
  ChartBarIcon,
  CogIcon,
  HomeIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

const navItems = [
  { name: 'Home', icon: HomeIcon, path: '/dashboard' },
  { name: 'Analytics', icon: ChartBarIcon, path: '/analytics' },
  { name: 'Users', icon: UserGroupIcon, path: '/users' },
  { name: 'Settings', icon: CogIcon, path: '/settings' },
]

export default function DashboardLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const raw = localStorage.getItem('user')
  const user = raw ? JSON.parse(raw) : null

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 shadow-xl">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <h1 className="text-xl font-extrabold tracking-wide text-indigo-400">
            Stockwave
          </h1>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-5 py-2 rounded-md transition-all duration-200 ${
                      isActive
                        ? 'bg-gray-800 text-indigo-400'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 flex items-center justify-end px-6 backdrop-blur-md bg-gray-900/70 border-b border-gray-800 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Username */}
            <div className="hidden sm:block text-right">
              <p className="font-semibold">
                {user ? `${user.first_name} ${user.last_name}` : 'Loading...'}
              </p>
            </div>

            {/* Dropdown */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="Profile"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li>
                  <button type="button" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
