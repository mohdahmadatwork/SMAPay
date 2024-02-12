import axios from "axios";
import { API_ENDPOINTS,API_URLS,BASE_URL } from "../urls/urls";


axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = 10000;


export class ApiClient{
    async signupapi(data){
        const config = {
            method:"post",
            url:API_URLS.SIGNUP,
            data:data,
            responseType:'json'
        }
        const res = await axios(config);
        let token = res?.data?.token;
        localStorage.setItem("token",token);
        return res;
    }
    async signinapi(data){
        const config = {
            method:'post',
            url:API_URLS.LOGIN,
            data:data,
            responseType:'json'
        };
        const res = await axios(config);
        let token = res?.data?.token;
        localStorage.setItem("token",token);
        return res;
    }
    async fetuserapi(){
        const accessToken = this.getToken();
        if (accessToken) {
            const header = {
                authorization : `Bearer ${accessToken}`
            }
            const config = {
                method:"get",
                url:API_URLS.GETUSERS,
                responseType:"json",
                headers:header
            }
            const response = await axios(config);
            return response;
        }else{
            let response = {};
            response.status(401);
            response.data({
                message:"Please login to send money."
            });
            return response; 
        }
    }
    async checkLogin(){
        const accessToken = this.getToken();
        if (accessToken) {
            const header = {
                authorization : `Bearer ${accessToken}`
            }
            const config = {
                method:"get",
                url:API_URLS.CHECkLOGIN,
                responseType:"json",
                headers:header
            }
            const response = await axios(config);
            return response;
        }else{
            let response = {};
            response["status"] = 401;
            response["data"]={
                message:"Please login to send money.",
                isLogin:false
            };
            return response
        }
    }
    async sendMoney(data){
        const accessToken = this.getToken();
        if (accessToken) {
            const headers = {
                authorization:`Bearer ${accessToken}`
            }
            const config = {
                method:"post",
                url:API_URLS.SEND,
                data:data,
                responseType:"json",
                headers:headers
            }
            const response = axios(config);
            return response;
        }else{
            let response = {};
            response["status"] = 401;
            response["data"]={
                message:"Please login to send money.",
                isLogin:false
            };
            return response
        }
    }
    async getBalance(){
        const accessToken = this.getToken();
        if (accessToken) {
            const headers = {
                authorization:`Bearer ${accessToken}`
            }
            const config = {
                method:"get",
                url:API_URLS.BALANACE,
                responseType:"json",
                headers:headers
            }
            const response = axios(config);
            return response;
        }else{
            let response = {};
            response["status"] = 401;
            response["data"]={
                message:"Please login to send money.",
                isLogin:false
            };
            return response
        }
    }
    async updateUser(data){
        const accessToken = this.getToken();
        if (accessToken) {
            const headers = {
                authorization:`Bearer ${accessToken}`
            }
            const config = {
                method:"put",
                url:API_URLS.UPDATEUSER,
                responseType:"json",
                data:data,
                headers:headers
            }
            const response = axios(config);
            return response;
        }else{
            let response = {};
            response["status"] = 401;
            response["data"]={
                message:"Please login to send money.",
                isLogin:false
            };
            return response
        }
    }
    logout () {
        localStorage.removeItem("token")
    }
    getToken = () => {
        return localStorage.getItem("token");
    }
}