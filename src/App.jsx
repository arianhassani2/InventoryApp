// src/App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'

export default function App() {
  return ( 
      <>
      {/* This is always visible */}
      <Navbar />

      <div className="">
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </>
  )
}
