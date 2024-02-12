import React from 'react'
import { useFetchUser } from '../contextApi/fetchusers-context'
import { useNavigate } from 'react-router-dom';

export const SearchUserCard = (props) => {
    const {findRecieverUser,allUsers} = useFetchUser();
    const navigate = useNavigate();
    const handleSendMoney = async () => {
        await findRecieverUser(props.reciever_id);
        navigate("/send");
    }
  return (
    <div className='flex justify-between'>
        <div className='flex items-center'>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </div>
            <div className='ms-2 flex items-baseline'>
                <span>{props.name} &nbsp;</span> 
                <span className='text-xs'>
                    ({props.userName})
                </span>
            </div>
        </div>
        <div className=''>
            <button className='bg-black text-white px-2 py-1 rounded-md' onClick={handleSendMoney}>{props.buttonTitle}</button>
        </div>
    </div>
  )
}
