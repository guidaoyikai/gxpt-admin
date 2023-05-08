import { defineStore } from 'pinia'

export const usersStore = defineStore('users', {
    persist: {
        enabled: true,//开启数据持久化
        strategies: [
          {
            key: 'store',//给一个要保存的名称
            storage: localStorage,//sessionStorage / localStorage 存储方式
          }
        ]
      },
    state: ()=>{
        return {
            id: "",
            phone: "",
            name: "",
        }
    }
})