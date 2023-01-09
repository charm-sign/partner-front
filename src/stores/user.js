
// pinia实际就是前端的缓存
import { defineStore } from 'pinia'   // 导入 defineStore

export const useUserStore = defineStore('user', {
    // 其他配置...
    state: () => ({
        loginInfo: {}  //{user:{},token: ''}
    }),//表示user对象{name:'',age:''}
    getters: { //获取
        getBearerToken() {
            return this.loginInfo.token ? 'Bearer ' + this.loginInfo.token : ''
        },
    },
    actions: { //存储
        setloginInfo(loginInfo) {
            this.loginInfo = loginInfo
        },
       
    },
    persist: true//开启数据持久化，默认Local Storage
})