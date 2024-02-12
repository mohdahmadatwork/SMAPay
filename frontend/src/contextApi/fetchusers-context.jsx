import { createContext,useContext, useState } from "react";
import { ApiClient } from "../services/api-client";

const FetchUserContext = createContext();


export const FetchUserProvider = ({children}) => {
    const [allUsers,setAllUsers] = useState([]);
    const [bckAllUsers,setBckAllUsers] = useState([]);
    const [recieverUser,setRecieverUser] = useState({});
    const apiCLient = new ApiClient();
    const fetchAllUsers = async () => {
        try {
            localStorage.removeItem("reciever");
            const response = await apiCLient.fetuserapi();
            const responseData = response.data;
            if (response.status>=200 && response.status<=300) {
                setAllUsers([...responseData.users]);
                setBckAllUsers([...responseData.users]);
                return true;
            }
        } catch (error) {
            let responseData = error.response.data;
            return responseData;
        }
    }
    const findRecieverUser = (id) => {
        if (id) {   
            const userE = allUsers.filter(user=>user._id === id);
            setRecieverUser({...userE[0]});
            localStorage.setItem("reciever",JSON.stringify(userE[0]));
        }else{
            setRecieverUser({});
            localStorage.removeItem("reciever");
        }
    }
    const sendMoneyTo = async (data) => {
        try {
            const response = await apiCLient.sendMoney(data);
            const responseData = response.data;
            if (response.status >= 200 && response.status<=300) {
                return responseData;
            }else{
                return responseData;
            }
        } catch (error) {
            let responseData = error.response.data;
            return responseData;
        }
    }
    const checkIsRecieverUserPresent = () => {
        const userE = JSON.parse(localStorage.getItem("reciever"));
        if (userE) {
            setRecieverUser({...recieverUser,...userE});
            return true;
        }else{
            setRecieverUser({});
            return false;

        }
    }
    const filterUser = (searchTerm) => {
        try {
            if (searchTerm.length>1) {
                const filteredArray = bckAllUsers.filter(obj =>
                Object.values(obj).some(value =>
                    typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()))
                );
                setAllUsers(filteredArray);
            }else{
                setAllUsers(bckAllUsers);
            }
        } catch (error) {
            
        }
    }
    return(
        <FetchUserContext.Provider value={{allUsers,fetchAllUsers,findRecieverUser,recieverUser,sendMoneyTo,checkIsRecieverUserPresent,filterUser}}>
            {children}
        </FetchUserContext.Provider>
    );
}


export const useFetchUser = ()=> {
    return useContext(FetchUserContext);
};