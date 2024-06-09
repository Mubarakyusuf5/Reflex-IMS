import React from 'react'
import { Login } from './pages/login/Login'
import { Register } from './pages/login/Register'
import { Frgt } from "./pages/FrgtPass/Frgt";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Route, Routes } from 'react-router-dom'

export const App = () => {
  return (
    <>
    <Routes>
    <Route path="/" exact element={<Login />}/>
    <Route path="/signup" element={<Register />}/>
    <Route path="/forgotPassword" element={<Frgt />}/>
    <Route path='/dashboard' element={<Dashboard />} />
    </Routes>

    </>
  )
}
