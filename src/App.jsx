import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

import './App.css';

const Home = lazy(() => import('./component/home.jsx'));
const Login = lazy(() => import('./component/login.jsx'));
const Signup = lazy(() => import('./component/signup.jsx'));

const socket = io('http://localhost:3000');

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [contact, setContact] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    const localStorageUser = localStorage.getItem('user');
    const parsedUser = JSON.parse(localStorageUser);
    if (parsedUser) {
      setUser(parsedUser);
      console.log(user);
      navigate('/');
    }
    return () => {
      socket.off('connect');
    };
  }, [navigate]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {user != null ? (
          <Route path='/' element={<Home user={user} setUser={setUser} socket={socket} contact={contact} setContact={setContact}/>} />
        ) : (
          <>
            <Route path='/login' element={<Login setUser={setUser} socket={socket} />} />
            <Route path='/signup' element={<Signup setUser={setUser} socket={socket} />} />
          </>
        )}
        <Route path='*' element={<Navigate to={user != null ? '/' : '/login'} />} />
      </Routes>
    </Suspense>
  );
};

export default App;
