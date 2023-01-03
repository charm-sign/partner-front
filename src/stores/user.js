
// pinia实际就是前端的缓存
import { defineStore } from 'pinia'   // 导入 defineStore

export const useUserStore = defineStore('user', {
    // 其他配置...
    state: () => ({
        user: {}
    }),//表示user对象{name:'',age:''}
    actions: {
        setUser(user) { 
            this.user=user
        }
    },
    persist: true//开启数据持久化，默认Local Storage
})