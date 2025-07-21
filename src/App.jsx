// src/App.jsx
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  )
}
