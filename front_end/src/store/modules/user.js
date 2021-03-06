import Vue from 'vue'
import router from '@/router'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { message } from 'ant-design-vue'
import {
    loginAPI,
    registerAPI,
    visitorAPI,
    getUserInfoAPI,
    updateUserInfoAPI,
    addCommonVipAPI,
    addCompanyVipAPI,
    getUserCreditRecordAPI,
} from '@/api/user'

import {
    getUserOrdersAPI,
    cancelOrderAPI,
    updateCommentAPI,
} from '@/api/order'
const getDefaultState = () => {
    return {
        userId: '',
        userInfo: {

        },
        userOrderList: [

        ],
        userCreditRecord:[

        ],
        registerVipVisible:false,
        viewOrderVisible:false,
        commentVisible:false,
        filterVisible:false,
        creditRecordVisible:false,
    }
}

const user = {
    state : getDefaultState(),

    mutations: {
        reset_state: function(state) {
            state.token = '',
            state.userId = '',
            state.userInfo = {

            },
            state.userOrderList = [],
            state.userCreditRecord=[]
        },
        set_token: function(state, token){
            state.token = token
        },
        set_email: (state, data) => {
            state.email = data
        },
        set_userId: (state, data) => {
            state.userId = data
        },
        set_userInfo: (state, data) => {
            state.userInfo = {
                ...state.userInfo,
                ...data
            }
        },
        set_userOrderList: (state, data) => {
            state.userOrderList = data
        },
        set_userCreditRecord: (state, data) => {
            state.userCreditRecord = data
        },
        set_RegisterVipVisible: function(state, data) {
            state.registerVipVisible = data
        },
        set_viewOrderVisible: function (state,data) {
            state.viewOrderVisible=data
        },
        set_commentVisible: function (state,data) {
            state.commentVisible=data
        },
        set_creditRecordVisible: function (state,data) {
            state.creditRecordVisible=data
        },
        set_filterVisible: function (state,data) {
            state.filterVisible=data
        },
    },

    actions: {
        login: async ({ dispatch, commit,state }, userData) => {
            const res = await loginAPI(userData)
            if(res) {
                setToken(res.id)
                commit('set_userId', res.id)
                dispatch('getUserInfo')
                // sessionStorage.setItem('uif',state.userInfo)
                if (res.userType === 'Client' && res.vipType === 'Common') {
                    var date = new Date();
                    var userMonth = res.birthday.substring(5, 7);
                    var userDate = res.birthday.substring(8, 10);
                    var curMonth = parseInt(date.getMonth() + 1);
                    var today = date.getDate();
                    if (curMonth < 10) curMonth = "0" + curMonth;
                    if (today < 10) today = "0" + today;
                    if (userMonth === curMonth && userDate === today) {
                        router.push('/user/components/Cake')
                        setTimeout(function(){
                            router.push('/hotel/hotelList')
                        },4000);
                    }
                } else {
                    router.push('/hotel/hotelList')
                }
            }
        },
        visitor: async ({ dispatch, commit,state }, userData) => {
            const res = await visitorAPI(userData)
            if(res){
                setToken(res.id)
                commit('set_userId', res.id)
                dispatch('getUserInfo')
                // sessionStorage.setItem('uif',state.userInfo)
                router.push('/hotel/hotelList')
            }
        },
        register: async({ commit }, data) => {
            const res = await registerAPI(data)
            if(res){
                message.success('注册成功')
            }
        },
        getUserInfo({ state, commit }) {
            return new Promise((resolve, reject) => {
              getUserInfoAPI(state.userId).then(response => {
                const data = response
                if (!data) {
                  reject('登录已过期，请重新登录')
                }
                commit('set_userInfo', data)
                  // sessionStorage.setItem('uif',state.userInfo)
                commit('set_userId', data.id)
                resolve(data)
              }).catch(error => {
                reject(error)
              })
            })
        },
        updateUserInfo: async({ state, dispatch }, data) => {
            const params = {
                id: state.userId,
                ...data,
            }
            const res = await updateUserInfoAPI(params)
            if(res){
                message.success('修改成功')
                dispatch('getUserInfo')
            }
        },
        updateComment: async({ state, dispatch }, data) => {
            const res = await updateCommentAPI(data)
            if(res){
                message.success('感谢您的评价')
                dispatch('getUserOrders')
            }
        },

        addCommonVip: async({ commit, dispatch }, data) => {
            const res = await addCommonVipAPI(data)
            if(res){
                // 添加成功后的操作（提示文案、modal框显示与关闭，调用优惠列表策略等）
                commit('set_RegisterVipVisible', false)
                message.success("您已成功成为普通会员")
                window.location.reload();
            }else{
                // 添加失败后的操作
                message.error('注册会员失败')
            }
        },
        addCompanyVip: async({ commit, dispatch }, data) => {
            const res = await addCompanyVipAPI(data)
            if(res){
                // 添加成功后的操作（提示文案、modal框显示与关闭，调用优惠列表策略等）
                commit('set_RegisterVipVisible', false)
                message.success("您已成功成为企业会员")
                window.location.reload();
            }else{
                // 添加失败后的操作
                message.error('注册会员失败')
            }
        },
        getUserOrders: async({ state, commit }) => {
            const data = {
                userId: Number(state.userId)
            }
            const res = await getUserOrdersAPI(data)
            if(res){
                commit('set_userOrderList', res)
            }
        },
        getUserCreditRecord:async({ getters, commit },userId) => {
            const res = await getUserCreditRecordAPI(userId)
            if(res){
                commit('set_userCreditRecord', res)
                console.log(getters.userCreditRecord)
            }
        },
        cancelOrder: async({ state, dispatch,getters }, orderId) => {
            const res = await cancelOrderAPI(orderId)
            if(res) {
                dispatch('getUserOrders')
                dispatch('getUserInfo')
                dispatch('getUserCreditRecord',getters.userId)
                message.success('撤销成功')
            }else{
                message.error('撤销失败')
            }
        },
        logout: async({ commit,state }) => {
            removeToken()
            resetRouter()
            commit('reset_state')
            // sessionStorage.setItem('uif',state.userInfo)
        },
          // remove token
        resetToken({ commit }) {
            return new Promise(resolve => {
                removeToken() // must remove  token  first
                commit('reset_state')
                resolve()
            })
        },
    }
}

export default user