import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './features/auth/authSlice';
import { useEffect, useState } from 'react';
import authService from './appwrite/auth';
import { Header, Loader, Container } from './components';
import { Outlet } from 'react-router';

function App() {
  const [ loading, setLoading ] = useState(true);
  const dispatch = useDispatch();


  // on first load, checks if logged in or not
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData=await authService.getUser();
          if (userData) {
            dispatch(login({ userData }));
            setLoading(false);
          } else {
            dispatch(logout());
            setLoading(false); //if no value is given by get user then automatically logged out
          }

      } catch (error) {
        dispatch(logout());
      }
  }
   checkAuth();
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
