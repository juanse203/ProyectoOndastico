import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginPage from './Pages/LoginPage/LoginPage'
import HomePage from './Pages/HomePage/HomePage'

const App = () => {



  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App