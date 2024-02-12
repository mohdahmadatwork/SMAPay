import React,{useEffect, useState} from 'react'
import InputFieldWithLabels from '../components/InputFieldWithLabels';
import CardFooter from '../components/CardFooter';
import { CardHeader } from '../components/CardHeader';
import { useLogin } from '../contextApi/login-context';
import { validateField, validateSignUpDataAtOnce,validateUpdateProfileField,validateUpdateProfileDataAtOnce } from '../utils/validates';
import { useNavigate } from 'react-router-dom';
export const UpdateProfile = () => {
    const [errors,setErrors] = useState({});
    const {currentUser,updateProfile} = useLogin();
    const navigate = useNavigate();
    const [updateProfilebody,setUpdateProfilebody] = useState({
        firstname:"",
        lastname:"",
        email:"",
        username:"",
        password:"",
        confirmpassword:"",
        ...currentUser
    });

    const handleChange = (e)=>{
        setUpdateProfilebody({...updateProfilebody, [e.target.name]: e.target.value});
        const errorTemp =validateUpdateProfileField(e.target.name,e.target.value,updateProfilebody); 
        setErrors({...errors,...errorTemp});
    }    
    const handleEdit = async () => {
        const q = confirm("Do you want to update the information?");
        if (q) {
            const error = validateUpdateProfileDataAtOnce(updateProfilebody);
            console.log(error);
            if (error.isAnyError === true) {   
                setErrors({...errors,...error.error});
            }else{
                const result = await updateProfile(error.data);
                alert(result.message);
                navigate("/signin");
            }
        }
    }
    useEffect(()=>{
        if (JSON.stringify(currentUser)==='{}') {
            navigate("/dashboard");
        }
    },[]);

  return (
    <div className='h-full flex justify-center items-center bg-gray-300'>
        <div className='flex flex-col rounded-lg px-4 py-2 bg-white'>
            <CardHeader heading={"Edit Profile"} secondaryinfotext={"Edit your any information as you want"}/>
            <div className='body mb-2'>
              <InputFieldWithLabels label={"First Name"} errors={errors} onchange={handleChange} value={updateProfilebody.firstname} id={"firstname"} name={"firstname"} type={"text"} placeholder={'Mohd'} />
              <InputFieldWithLabels label={"Last Name"} errors={errors} onchange={handleChange} value={updateProfilebody.lastname} id={"lastname"} name={"lastname"} type={"text"} placeholder={'Ahmad'} />
              <InputFieldWithLabels label={"Email"} errors={errors} onchange={handleChange} value={updateProfilebody.email} id={"email"} name={"email"} type={"text"} placeholder={'mohdahmadatwork@gmail.com'} />
              <InputFieldWithLabels label={"Username"} errors={errors} onchange={handleChange} value={updateProfilebody.username} id={"username"} name={"username"} type={"text"} placeholder={'mohdahmad'} />
              <InputFieldWithLabels label={"Password"} errors={errors} onchange={handleChange} value={updateProfilebody.password} id={"password"} name={"password"} type={"password"} placeholder={'Choose strong passwords'} />
              <InputFieldWithLabels label={"Confirm Password"} errors={errors} onchange={handleChange} value={updateProfilebody.confirmpassword} id={"confirmpassword"} name={"confirmpassword"} type={"password"} placeholder={'Choose strong passwords'} />
            </div>
            <CardFooter heading={"Edit"} onclick={handleEdit} secondarytext={""} link={""} linkTitle = {""}/>
        </div>
    </div>
  )
}
