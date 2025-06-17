import { Link, NavLink,useLocation } from "react-router";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import { Button } from '../index'

function Header() {
  const isLoggedIn = useSelector((state) => state.Auth.status); //checks from the store if user is logged in
  const location= useLocation();

  // Industry standard way of making a nav bar. A loop is given over the array.
  const navItems = [
    { name: "Home", route: "/", active: !isLoggedIn, },
    { name: "All Post", route: "/allPost", active: isLoggedIn },
    { name: "Add Post", route: "/addPost", active: isLoggedIn },
  ];
  return (
    <>

      <header className="w-full bg-[#000000] text-[#FFFFFF] flex items-center justify-evenly h-10">
        {/* Logo section */}
        <div className="logo w-1/3 justify-start ml-5 md:ml-10 text-sm md:text-2xl items-center">
          <Link to="/home">
            <Logo />
          </Link>
        </div>
        {/* navigation section */}
        <ul className="flex w-2/3 justify-end space-x-5 md:space-x-10 mr-5 md:mr-10 text-sm md:text-lg items-center">
          {navItems.map((item) =>
            //if logged in then only All post and add post are shown
            item.active ? (
              <li className="focus:ring-4 hover:text-[#FCA311] focus:ring-[#FCA311] font-medium rounded-lg focus:outline-none p-1 cursor-pointer" key={item.name}>
                <NavLink
                  to={item.route}
                  className={({ isActive }) =>
                    isActive ? "text-[#FCA311]" : null
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ) : null
          )}
          {/* Button Section */}
          {/* if the user is logged in then logout button is showed else login button is showed */}
          {isLoggedIn ? (
            
            <Button
              text="Logout"
              type="submit"
              use="logout"
              bgColor="bg-[#14213d]"
              hoverColor="hover:bg-[#1a2b4a]"
              activeColor="active:bg-[#0f1b2e]"
            />):
          (
            
            (location.pathname==="/")?(
            <Button
              text="Login"
              type="submit"
              use="navLogin"
              bgColor="bg-[#14213d]"
              hoverColor="hover:bg-[#1a2b4a]"
              activeColor="active:bg-[#0f1b2e]"
            />):null
          )}
        </ul>
      </header>
    </>
  );
}

export default Header;
