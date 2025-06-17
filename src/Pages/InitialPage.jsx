import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { useEffect } from 'react'

function InitialPage() {
    const isLoggedIn = useSelector((state) => state.Auth.status);
    const navigate =useNavigate();
    // If the user is not logged in, redirect to the login page
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/allPost')
        }
        else
        {
            navigate('/home')
        }
    }, []);
  return null}

export default InitialPage