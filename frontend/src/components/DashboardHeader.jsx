import React, { useState } from 'react'
import { useLogin } from '../contextApi/login-context'
import { ProfileDropdown } from './ProfileDropdown';
export const DashboardHeader = () => {
    const {currentUser} = useLogin();
    const [openProfileDropdown,setOpenProfileDropdown] = useState(false);
    const toggleProfileDropdown = () => {
        if (openProfileDropdown) {
            setOpenProfileDropdown(false);
        }else{
            setOpenProfileDropdown(true);
        }
    }
  return (
    <div className='flex flex-col'>
        <div className='w-full flex justify-between mt-2'>
            <div className='text-black text-3xl font-bold'>
                SMAPay
            </div>
            <div className='flex items-center'>
                <span>{currentUser?.firstname+" "+currentUser?.lastname}</span>
                <span className='ms-2 cursor-pointer' onClick={toggleProfileDropdown}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </span>
            </div>
        </div>
        <hr className='my-2'/>
        <div className='mb-3'>
            <span className='text-xl'>Your Balance </span> 
            <span className='text-xl'>{"$"+(currentUser?.balance)}</span>
        </div>  
        {openProfileDropdown && <ProfileDropdown/>}
    </div>
  )
}
