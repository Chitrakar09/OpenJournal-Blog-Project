import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Loader } from '../index'

/* 1. why this component was made?
    => It was made to protect certain pages or routes in your React app, so that:
        :✅ Only logged-in users can see those pages (like /dashboard)
        :❌ If the user is not logged in, they will be automatically redirected to /login
   2. How does it work?
    => <Protected authentication={true}>
          <Dashboard />
       </Protected>
   3. How does it function?
    => If this page requires login (authentication === true) But user is not logged in (authStatus !== true)
            Then: redirect to /login
       If this page requires not to be logged in (e.g., signup or login page) But user is logged in 
            Then: redirect to homepage (/)
       After checking, stop loading (setLoader(false)) 
       If we’re still checking login status → show "Loading..."
       Once done → show the protected content (children)   
     
*/



function Protected({ children, requireLogin = true }) {
    const [ loader, setLoader ] = useState(true);
    const isLoggedIn = useSelector((state) => state.Auth.status)
    const navigate = useNavigate()

    useEffect(() => {

        let shouldRedirect = false
        if (requireLogin && isLoggedIn !== requireLogin) {
            navigate("/home");
            shouldRedirect = true;
        }
        else if (isLoggedIn && requireLogin !== isLoggedIn) {
            navigate("/")
            shouldRedirect = true;
        }

        if (!shouldRedirect) setLoader(false);

    }, [ requireLogin, isLoggedIn, navigate ])
    return loader ? <Loader /> : <>{children}</>;
}

export default Protected