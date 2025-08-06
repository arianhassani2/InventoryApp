// src/components/PublicLayout.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function PublicLayout() {
  return (
    <>
      <Navbar />      {/* only your marketing/site navbar */}
      <Outlet />      {/* public pages go here (Home, Features, Blog, etc.) */}
    </>
  )
}
