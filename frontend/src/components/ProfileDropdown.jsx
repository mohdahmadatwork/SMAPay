import React from 'react'
import { useLogin } from '../contextApi/login-context'
import { Link, useNavigate } from 'react-router-dom';

export const ProfileDropdown = () => {
    const {doLogout} = useLogin();
    const navigate = useNavigate();
    const handleLogout = () => {
        doLogout();
        navigate("/signin");
    }
  return (
    <div className="absolute right-0 z-10 mt-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
        <div className="py-1" role="none">
            <Link to={"/updateprofile"} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Account settings</Link>
            <button onClick={handleLogout} type="submit" className="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">Sign out</button>
        </div>
    </div>
  )
}
