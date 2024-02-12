import React,{createContext,useContext,useState} from "react";
import { ApiClient } from "../services/api-client";

const LoginContext = createContext();

export const LoginProvider = ({children}) =>{
    const [isLogin,setIsLogin] = useState(false);
    const [currentUser,setCurrentUser] = useState({});
    const apiClient = new ApiClient();
    const doLogin = async (data) =>{
        try {
            const response = await apiClient.signinapi(data);
            const responseData = response.data;
            if (response.status>=200 && response.status<=300) {
                if (responseData.token) {
                    setIsLogin(true);
                    setCurrentUser(responseData.user);
                    delete responseData.user;
                    return responseData;
                }else{
                    setIsLogin(false);
                }
            }else{
                setIsLogin(false);
                return responseData;
            }
        } catch (error) {
            let responseData = error.response.data;
            return responseData;
        }
    }
    const doSignUp = async (data) =>{
        try {
            const response = await apiClient.signupapi(data);
            const responseData = response.data;
            if (response.status>=200 && response.status<=300) {
                if (responseData.token) {
                    setIsLogin(true);
                    setCurrentUser({...responseData.user});
                    
                    delete responseData.user;
                    return responseData;
                }else{
                    setIsLogin(false);
                    return responseData;
                }
            }else{
                setIsLogin(false);
                return responseData;
            }
        } catch (error) {
            let responseData = error.response.data;
            return responseData;
        }
    }
    const checkLogin = async () => {
        try {
            const response = await apiClient.checkLogin();
            const responseData = response.data;
            if (response.status >=200 && response.status<=300) {
                setIsLogin(true);
                setCurrentUser({...responseData.user});
                return responseData;
            }else{
                setIsLogin(false);
                setCurrentUser({});
                return responseData;
            }
        } catch (error) {
            setIsLogin(false);
            setCurrentUser({});
            let responseData = error.response.data;
            return responseData;
        }
    }
    const doLogout = () => {
        const result = confirm("Do you really want to logout?");
        if (result) {
            apiClient.logout();
        }
    }
    const updateBalance = async () => {
        try {
            const response = await apiClient.getBalance();
            const responseData = response.data;
            if (response.status>=200 && response.status<=300) {
                setCurrentUser({...currentUser , balance:responseData.balance});
                return true;
            }else{
                return false;
            }
        } catch (error) {
            setIsLogin(false);
            setCurrentUser({});
            let responseData = error.response.data;
            return responseData;
        }
    }
    const updateProfile = async (data) => {
        try {
            const response = await apiClient.updateUser(data);
            const responseData = response.data;
            if (response.status>=200 && response.status<=300) {
                setCurrentUser({...currentUser , balance:responseData.balance});
                return responseData;
            }else{
                return responseData;
            }
        } catch (error) {
            setIsLogin(false);
            setCurrentUser({});
            let responseData = error.response.data;
            return responseData;
        }
    }
    return (
        <LoginContext.Provider value={{isLogin,doSignUp,doLogin,currentUser,checkLogin,doLogout,updateBalance,updateProfile}}>
            {children}
        </LoginContext.Provider>
    );
}


export const useLogin = () => {
    return useContext(LoginContext);
};