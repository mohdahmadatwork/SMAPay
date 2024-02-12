import React, { useState,useEffect } from 'react'
import { DashboardHeader } from '../components/DashboardHeader'
import { SearchUserCard } from '../components/SearchUserCard'
import InputFieldWithLabels from '../components/InputFieldWithLabels'
import { useLogin } from '../contextApi/login-context'
import { useFetchUser } from '../contextApi/fetchusers-context'
import { useNavigate } from 'react-router-dom'
function Dashboard() {
  const [errors,setErrors] = useState({});
  const [searchBody,setSearchBody] = useState({
    searchuser:""
  });
  const {isLogin} = useLogin();
  const {allUsers,fetchAllUsers,filterUser} = useFetchUser();
  const navigate = useNavigate();
  const handleChange = (e) => {
    try {
      setSearchBody({...searchBody,[e.target.name]:e.target.value});
      filterUser(searchBody.searchuser);
    } catch (error) {
      console.log(errors);
    }
  }
  const fetchuser = async () => {
    try {
      const isSuccess = await fetchAllUsers();
      if (isSuccess != true) {
        console.log(isSuccess);
        alert(isSuccess.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (isLogin) { 
      fetchuser();
    }else{
      navigate('/signin');
    }
  }, []);
  return (
    <div className='px-2'>
      <DashboardHeader/>
      <div>
        <div className='text-2xl font-bold'>User</div>
        <InputFieldWithLabels label={""} errors={errors} onchange={handleChange} value={searchBody.searchuser} id={"searchuser"} name={"searchuser"} type={"text"} placeholder={'Search...'}/>
        {allUsers.map(user =><SearchUserCard key={user._id} reciever_id = {user._id} name={user.firstname+" "+user.lastname} userName = {user.username} buttonTitle={"Send Money"} />)}
      </div>
    </div>
  )
}

export default Dashboard