<template>
    <div class="award-form">
        <el-drawer
        v-model="props.awardFromDrawer"
        title="兑换页面"
        :direction="direction"
        @close="emit('reset-drawer')"
        :size="'100%'"
        class="container"
        >
          <el-card class="box-card" 
           shadow="never"
           body-style="{border:none}">
            <template #header>
              <div class="card-header">
                <span>{{props.shopInfo.title}}</span>
                <span style="margin-left: 14px;">价值: {{props.shopInfo.worth}}元</span>
                <span style="margin-left: 60px; color:brown">所需积分:{{props.shopInfo.integral}}</span>
              </div>
            </template>
            <div class="award-details">
              <img
              :src="props.shopInfo.image"
              class="image"
              />
              <div class="desription">
                {{props.shopInfo.textarea}}
              </div>
            </div>
          </el-card>
        </el-drawer>
    </div>
</template>
<script setup>
import {ref, reactive,onMounted} from 'vue'

//兑换确认框
const centerDialogVisible = ref(false)

//抽屉方向
const direction = ref('ttb')

const props = defineProps({
    awardFromDrawer: Boolean,//控制抽屉的变量
    shopInfo:Object
})
const emit = defineEmits(['reset-drawer'])
 




</script>
<style scoped>
.container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.award-details{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.desription{
  margin-left: 20px;
}
.image{
  width: 100%;
  max-width: 300px;
  min-width: 200px;
  height: auto;
}
.express-form{
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>