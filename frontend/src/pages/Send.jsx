import React, { useEffect, useState } from 'react'
import { useFetchUser } from '../contextApi/fetchusers-context';
import { CardHeader } from '../components/CardHeader';
import CardFooter from '../components/CardFooter';
import InputFieldWithLabels from '../components/InputFieldWithLabels';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../contextApi/login-context';
function Send() {
  const [errors,setErrors] = useState({});
  const {recieverUser,sendMoneyTo,checkIsRecieverUserPresent} = useFetchUser();
  const navigate = useNavigate();
  const {updateBalance} = useLogin();
  const [sendMoneyBody,setSendMoneyBody] = useState({
    to:recieverUser._id,
    amount:""
  });
  const handleChange = (e) => {
    setSendMoneyBody({...sendMoneyBody,[e.target.name]:e.target.value});
  }
  const handleSendMonry = async () => {
    const rsb = await sendMoneyTo(sendMoneyBody);
    await updateBalance();
    alert(rsb.message);
    navigate("/dashboard");
  }
  useEffect(()=>{
    if (!recieverUser._id) {
      const isRecieverPresent = checkIsRecieverUserPresent();
      if (!isRecieverPresent) {
        navigate("/dashboard");
      }
    }
  },[]);
  return (
    <div className='h-full flex justify-center items-center bg-gray-300'>
        <div className='flex flex-col rounded-lg px-4 py-2 bg-white'>
            <CardHeader heading={"Send Money"} secondaryinfotext={""}/>
            <div className='body mb-2'>
              <div className='flex justify-start items-center mb-2'>
                <div className='me-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </div>
                <div className='flex text-lg font-bold items-center'>
                  <span>{recieverUser.firstname+" "+recieverUser.lastname} &nbsp;</span>
                  <span className='text-sm'>({recieverUser.username})</span>
                </div>
              </div>
              <InputFieldWithLabels label={"Amount (In $)"} errors={errors} onchange={handleChange} value={sendMoneyBody.amount} id={"amount"} name={"amount"} type={"text"} placeholder={'1200'} />
            </div>
            <CardFooter heading={"Initiate Transfer"} onclick={handleSendMonry} secondarytext={""} link={""} linkTitle = {""}/>
        </div>
    </div>
  )
}

export default Send