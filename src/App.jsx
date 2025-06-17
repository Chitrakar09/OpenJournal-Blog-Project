import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './features/auth/authSlice';
import { useEffect, useState } from 'react';
import authService from './appwrite/auth';
import { Header, Loader, Container } from './components';
import config from './config/config';
import { Outlet } from 'react-router';

function App() {
  const [ loading, setLoading ] = useState(true);
  const dispatch = useDispatch();

  // on first load, checks if logged in or not
  useEffect(() => {
    authService.getUser().then((userData) => {
      if (userData) {
        dispatch(login({ userData }));
      } else {
        dispatch(logout()); //if no value is given by get user then automatically logged out
      }
    }).finally(() => setLoading(false));
  }, [])

  // conditional rendering
  return loading ? (<Container className='justify-center'>
    <Loader></Loader>
  </Container>) : (
    <>
      <Header />
      <Outlet />
    </>

  )
}

export default App
