<template>
  
  <div class="common-layout" style="height: 100%;">
    <el-container>
      <div>
        <el-aside width="200px">
          <el-menu
          
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :router="true"
          :default-active="'/home'"
        >
          
          <el-menu-item  index="/home">
            <el-icon><icon-menu /></el-icon>
            <span>需求审核</span>
          </el-menu-item>
          <el-menu-item index="/supply" >
            <el-icon><document /></el-icon>
            <span>供应审核</span>
          </el-menu-item>
          <el-menu-item index="/shop">
            <el-icon><setting /></el-icon>
            <span>积分上架</span>
          </el-menu-item>
          <el-menu-item index="/exchange">
            <el-icon><setting /></el-icon>
            <span>兑换列表</span>
          </el-menu-item>
        </el-menu>
        </el-aside>
      </div>
      
      <el-container>
        <el-header>
          <div style="margin-top: 10px;">
            {{store.name}}
            <el-button style="margin-left: 20px;" @click="logout">退出系统</el-button>
          </div>

        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>


    
  
  
</template>

<script setup>
import {ref} from 'vue'
import {removeToken} from '@/utils/auth'
import {useRouter} from 'vue-router'
import {usersStore} from '@/store/users'

const router = useRouter()
let store = usersStore()

const logout = () => {
    removeToken()
    localStorage.removeItem('store')
    router.push('/login')
}
</script>

  
<style scoped>

.el-menu{
  height: 100vh;
}
</style>