import React from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Toaster } from './components/ui/sonner'

const app = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  }
])

const App = () => {
  return (
    <div className="min-h-screen w-full">
      <RouterProvider router={app} />
      <Toaster />
    </div>
  )
}

export default App