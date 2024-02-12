import React, { useState } from 'react'
import InputFieldWithLabels from '../components/InputFieldWithLabels';
import { validateField, validateSignUpDataAtOnce } from '../utils/validates';
import { CardHeader } from '../components/CardHeader';
import CardFooter from '../components/CardFooter';
import { useLogin } from '../contextApi/login-context.jsx';
import { useNavigate } from 'react-router-dom';
function Signup() {
  const {doSignUp} = useLogin();
  const [signupbody,setSignupbody] = useState({
    firstname:"",
    lastname:"",
    username:"",
    email:"",
    password:"",
    confirmpassword:""
  });
  const [errors,setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setSignupbody({...signupbody, [e.target.name]:e.target.value});
    const errorTemp =validateField(e.target.name,e.target.value,signupbody); 
    setErrors({...errors,...errorTemp});
  }
  const handleSignUp = async ()=>{
    try {
      const correctDetails = validateSignUpDataAtOnce(signupbody);
      if (correctDetails === true) {
        let isLogin = await doSignUp(signupbody);
        if (isLogin.token) {
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
  return (
    <div className='h-full flex justify-center items-center bg-gray-300'>
        <div className='flex flex-col rounded-lg px-4 py-2 bg-white'>
            <CardHeader heading={"Sign Up"} secondaryinfotext={"Enter your information to create an account"}/>
            <div className='body mb-2'>
              <InputFieldWithLabels label={"First Name"} errors={errors} onchange={handleChange} value={signupbody.firstname} id={"firstname"} name={"firstname"} type={"text"} placeholder={'Mohd'} />
              <InputFieldWithLabels label={"Last Name"} errors={errors} onchange={handleChange} value={signupbody.lastname} id={"lastname"} name={"lastname"} type={"text"} placeholder={'Ahmad'} />
              <InputFieldWithLabels label={"Email"} errors={errors} onchange={handleChange} value={signupbody.email} id={"email"} name={"email"} type={"text"} placeholder={'mohdahmadatwork@gmail.com'} />
              <InputFieldWithLabels label={"Username"} errors={errors} onchange={handleChange} value={signupbody.username} id={"username"} name={"username"} type={"text"} placeholder={'mohdahmad'} />
              <InputFieldWithLabels label={"Password"} errors={errors} onchange={handleChange} value={signupbody.password} id={"password"} name={"password"} type={"password"} placeholder={'Choose strong passwords'} />
              <InputFieldWithLabels label={"Confirm Password"} errors={errors} onchange={handleChange} value={signupbody.confirmpassword} id={"confirmpassword"} name={"confirmpassword"} type={"password"} placeholder={'Choose strong passwords'} />
            </div>
            <CardFooter heading={"Sign Up"} onclick={handleSignUp} secondarytext={"Already have an account?"} link={"/signin"} linkTitle = {"Login"}/>
        </div>
    </div>
  )
}
export default Signup;