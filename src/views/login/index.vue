<template>
<div class="layout">
    <el-tabs type="border-card">
    <el-tab-pane label="登录">
        <el-form
        label-position="right"
        label-width="60px"
        style="max-width: 460px"
        class="loginForm"
        >
        <el-form-item label="账号：">
            <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="密码：">
            <el-input type="password" v-model="form.password" />
        </el-form-item>
        <el-button
            type="primary"
            class="loginBtn"
            @click="handleLogin"
        >
            登录
        </el-button>
        </el-form>
    </el-tab-pane>


    </el-tabs>
</div>
</template>
<script setup>
import { reactive } from "vue";
import {login} from '@/api/login'
import {useRouter} from 'vue-router'
import {setToken} from '@/utils/auth'
import {usersStore} from '@/store/users'

const form = reactive({
    phone: "",
    password: "",
});

// 方法
// 登录
const store = usersStore()
const router = useRouter()
async function  handleLogin() {
   let res = await login(form)
   if(res.data.code=="0000"){
    let {token} = res.data
      if(token){
        setToken(token)
        let {id, phone,name} = res.data.data
        store.$patch((state) => {
          state.id = id
          state.phone = phone
          state.name = name
        })
    router.push('/home')
   }
}
}


</script>

<style scoped>
.layout {
position: absolute;
left: calc(50% - 200px);
top: 20%;
width: 400px;
}
.loginBtn {
width: 100px;
}
.loginForm {
text-align: center;
}
.checkBox {
margin-left: 7px;
}
.inpWidth {
width: 165px;
}
</style>
