
// pinia实际就是前端的缓存
import { defineStore } from 'pinia'   // 导入 defineStore

export const useUserStore = defineStore('user', {
    // 其他配置...
    state: () => ({
        loginInfo: {}  //{user:{},token: ''}  //理解为缓存
    }),//表示user对象{name:'',age:''}
    getters: {   //获取方法
        getToken() {                               
            return this.loginInfo.token ||''
        },
        getBearerToken() {                                 
            return this.loginInfo.token ? 'Bearer ' + this.loginInfo.token : ''
        },
        getUserId() {
            return this.loginInfo.user ? this.loginInfo.user.id : 0
        },
        getUser() {
            return this.loginInfo.user ? this.loginInfo.user : 0
        }
    },
    actions: { //存储方法 会以js文件名作为key
        setloginInfo(loginInfo) {
            this.loginInfo = loginInfo
        },

    },
    persist: true//开启数据持久化，默认Local Storage
})