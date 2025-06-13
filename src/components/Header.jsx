import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { FaMoon, FaSun } from "react-icons/fa";


const Header = () => {
    const { user, logOut } = use(AuthContext);
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

    // Apply theme on load & change
    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
        localStorage.setItem("theme", theme);
    }, [theme]);
     const handleThemeToggle = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };
    const handleLogout = () => {
        logOut()
            .then(() => {
                // Sign-out successful.
                Swal.fire({
                    title: "You logged out successfully",
                    icon: "success",
                    draggable: true
                });
            }).catch((error) => {
                // An error happened.
                toast(error.message);
            });
    }

    return (
        <div className='bg-primary border-b-1 border-white ' >
            <div className="navbar w-11/12 mx-auto shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-primary lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/bookshelf">Bookshelf</NavLink></li>
                            <li><NavLink to="/add-book">Add Book</NavLink></li>
                            <li><NavLink to="/my-books">My Books</NavLink></li>
                            <li><NavLink to="/profile">Profile</NavLink></li>

                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl"><div className="md:text-3xl text-white font-medium"><h1>VR<span className='text-secondary'>📚booK</span></h1></div></a>
                </div>
                <div className="navbar-center text-white  hidden lg:flex ">
                    <ul className="menu menu-horizontal flex gap-4 text-[16px] px-1">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/bookshelf">Bookshelf</NavLink></li>
                        <li><NavLink to="/add-book">Add Book</NavLink></li>
                        <li><NavLink to="/my-books">My Books</NavLink></li>
                        <li><NavLink to="/profile">Profile</NavLink></li>

                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="login-btn flex gap-5">
                         <button
                            onClick={handleThemeToggle}
                            className="btn btn-sm btn-circle bg-secondary text-white"
                        >
                            {theme === "light" ? <FaMoon /> : <FaSun />}
                        </button>

                        {user &&
                            <img
                                className='w-10 h-10 hidden md:block rounded-full object-cover cursor-pointer'
                                src={user.photoURL}
                                alt="user"
                                title={user.displayName}
                            />
                        }
                        {
                            user ? <button onClick={handleLogout} className='btn btn-secondary text-primary'>Log Out</button> : <Link to='login' className='btn btn-secondary md:px-10 text-primary'  >Login</Link>
                        }

                    </div>
                </div>
            </div>



        </div>
    );
};

export default Header;