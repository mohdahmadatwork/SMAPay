export const BASE_URL = "http://localhost:5000/api/v1";
export const API_ENDPOINTS = {
    LOGIN: '/user/signin',
    SIGNUP: '/user/signup',
    SEND: '/account/transfer',
    BALANACE: '/account/balance',
    UPDATEUSER: '/user/updateuser',
    GETUSERS: '/user/bulk',
    CHECkLOGIN : '/user/checkLogin'
}


export const API_URLS = {
    LOGIN: `${BASE_URL}${API_ENDPOINTS.LOGIN}`,
    SIGNUP: `${BASE_URL}${API_ENDPOINTS.SIGNUP}`,
    SEND: `${BASE_URL}${API_ENDPOINTS.SEND}`,
    BALANACE: `${BASE_URL}${API_ENDPOINTS.BALANACE}`,
    UPDATEUSER: `${BASE_URL}${API_ENDPOINTS.UPDATEUSER}`,
    GETUSERS: `${BASE_URL}${API_ENDPOINTS.GETUSERS}`,
    CHECkLOGIN:`${BASE_URL}${API_ENDPOINTS.CHECkLOGIN}`
}