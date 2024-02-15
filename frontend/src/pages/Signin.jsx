import React, { useState } from 'react';
import { CardHeader } from '../components/CardHeader';
import CardFooter from '../components/CardFooter';
import InputFieldWithLabels from '../components/InputFieldWithLabels';
import { validateSignIn, validateSignInDataAtOnce } from '../utils/validates';
import { useLogin } from '../contextApi/login-context';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { BASE_URL } from '../urls/urls';
function Signin() {
  console.log("BASE_URL",BASE_URL);
  const [errors,setErrors] = useState({});
  const {isLogin,doLogin,checkLogin} = useLogin();
  const [signInBody,setSignInBody] = useState({
    username_email:"",
    password:""
  });
  const navigate = useNavigate();
  function handleChange(e){
    try {
      setSignInBody({...signInBody, [e.target.name]:e.target.value});
      const error = validateSignIn(e.target.name,e.target.value);
      setErrors({...errors,...error});
    } catch (error) {
      
    }
  }
  const handelLogin = async () =>{
    try {
      const correctDetails = validateSignInDataAtOnce(signInBody);
      if (correctDetails) {
        let isLogin = await doLogin(signInBody);
        if (isLogin.token) {
          console.log("isLogin",isLogin);
          alert(isLogin.message);
          navigate('/dashboard');
        }else{
          alert(isLogin.message);
        }
      }else{
        alert("Please correct the below errors!");
      }
    } catch (error) {
      
    }

  }
  const verifyLogin = async () => {
    const isAlreadyLogin = await checkLogin();
    console.log("isAlreadyLogin",isAlreadyLogin);
    if (isAlreadyLogin.isLogin) {
      navigate("/dashboard");
    }
  }
  useEffect(() => {
    verifyLogin();
  },[])
  return (
    <div className='h-full flex justify-center items-center bg-gray-300'>
        <div className='flex flex-col rounded-lg px-4 py-2 bg-white'>
            <CardHeader heading={"Sign In"} secondaryinfotext={"Enter your credentials to access your account"}/>
            <div className='body mb-2'>
              <InputFieldWithLabels label={"Username / Email"} errors={errors} onchange={handleChange} value={signInBody.username_email} id={"username_email"} name={"username_email"} type={"text"} placeholder={'mohdahmad'} />
              <InputFieldWithLabels label={"Password"} errors={errors} onchange={handleChange} value={signInBody.password} id={"password"} name={"password"} type={"password"} placeholder={'Ahmad'} />
            </div>
            <CardFooter heading={"Sign In"} onclick={handelLogin} secondarytext={"Don't have an account?"} link={"/signup"} linkTitle = {"SignUp"}/>
        </div>
    </div>
  )
}

export default Signin