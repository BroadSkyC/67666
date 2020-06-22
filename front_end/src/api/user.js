import { axios } from '@/utils/request'

const api = {
    userPre: '/api/user'
}
export function loginAPI(data){
    return axios({
        url:`${api.userPre}/login`,
        method: 'POST',
        data
    })
}
export function registerAPI(data){
    return axios({
        url: `${api.userPre}/register`,
        method: 'POST',
        data
    })
}
export function getUserInfoAPI(id){
    return axios({
        url: `${api.userPre}/${id}/getUserInfo`,
        method: 'GET'
    })
}
export function getUserCreditRecordAPI(id){
    return axios({
        url:`${api.userPre}/${id}/getUserCreditRecord`,
        method: 'GET',
    })
}
export function updateUserInfoAPI(data) {
    return axios({
        url: `${api.userPre}/${data.id}/userInfo/update`,
        method: 'POST',
        data
    })
}
export function addCommonVipAPI(data) {
    return axios({
        url: `${api.userPre}/addCommonVip`,
        method: 'POST',
        data,
    })
}
export function addCompanyVipAPI(data) {
    return axios({
        url: `${api.userPre}/addCompanyVip`,
        method: 'POST',
        data,
    })
}

