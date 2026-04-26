import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewBug from './pages/NewBug';
import BugDetail from './pages/BugDetail';

function App() {
  const token = localStorage.getItem('token');
  
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white">
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between">
            <h1 className="text-xl font-bold">🐛 BugHunter</h1>
            <div>
              {token ? (
                <>
                  <a href="/" className="mr-4">Home</a>
                  <a href="/new-bug" className="mr-4">New Bug</a>
                  <button onClick={() => {
                    localStorage.clear();
                    window.location.href = '/login';
                  }}>Logout</button>
                </>
              ) : (
                <>
                  <a href="/login" className="mr-4">Login</a>
                  <a href="/register">Register</a>
                </>
              )}
            </div>
          </div>
        </nav>
        
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-bug" element={token ? <NewBug /> : <Navigate to="/login" />} />
            <Route path="/bug/:id" element={<BugDetail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;