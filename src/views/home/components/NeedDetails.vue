<template>
    <div class="details">
        <el-drawer
        v-model="props.drawer"
        :title="props.currentNeed.title"
        :direction="direction"
        @close="emit('reset-drawer')"
        :size="'100%'"
        >
        <div class="needinfo">
            <el-descriptions title="发布者信息" :column="3" border v-if="prePage">
                <el-descriptions-item
                  label="Username"
                  label-align="right"
                  align="center"
                  label-class-name="my-label"
                  class-name="my-content"
                  width="150px"
                  style="color: blue;"
                  >
                  
                  <el-button>{{props.currentNeed.nickname}}</el-button>
               

                <UserHomePage
                :id = "props.currentNeed.id"
                :drawer="drawer"
                 @reset-drawer="resetDrawer"
                 v-if="drawer"
                 >
               </UserHomePage>


                </el-descriptions-item>
                <!-- <el-descriptions-item label="电话" label-align="right" align="center"
                  >18100000000</el-descriptions-item
                > -->
                <!-- <el-descriptions-item label="城市" label-align="right" align="center"
                  >Suzhou</el-descriptions-item
                > -->
                <!-- <el-descriptions-item label="微信" label-align="right" align="center"
                  >
                  <el-popover placement="right" :width="100" trigger="hover">
                    <template #reference>
                      <span style="color: blue;">风消息</span>
                    </template>
                    <div style="padding: 10px;">
                        <img
                        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                        style="height: 100px; width:100px;"
                        />
                    </div>
                  </el-popover>

                </el-descriptions-item
                > -->
                <el-descriptions-item label="地址" label-align="right" align="center"
                  >{{props.currentNeed.address.province + props.currentNeed.address.city+ props.currentNeed.address.area}}</el-descriptions-item
                >
              </el-descriptions>

              <el-descriptions title="交易方式">
                <el-descriptions-item label="类型">{{props.currentNeed.type[0]}}</el-descriptions-item>
                <!-- <el-descriptions-item label="点击按钮发送请求：">
                    <el-button type="success" @click="drawerMsg = true">接收需求</el-button>
                    <el-drawer v-model="drawerMsg" title="I am the title" :with-header="false">
                        <div class="msg">发送消息：</div>
                        <el-input
                        v-model="textarea"
                        :rows="20"
                        type="textarea"
                        placeholder="Please input"
                      />
                      <el-button type="success"
                       style="margin-top: 20px;width: 100px;"
                       >发送</el-button>
                    </el-drawer>
                </el-descriptions-item> -->
              </el-descriptions>
        </div>
        <div>
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="详情" name="first">
                    <div class="description">
                        {{props.currentNeed.textarea}}
                    </div>
                    <div class="image-list">
                        <img
                        v-for=" item in props.currentNeed.images"
                        :key="item"
                        :src="item"
                        class="image"
                        />
      
                    </div>
                </el-tab-pane>
                
              </el-tabs>
        </div>


        </el-drawer>
    </div>
</template>
<script setup>
import {ref, reactive, defineAsyncComponent, onMounted} from 'vue'
const prePage = ref(true)



//用户主页抽屉控制
let drawer = ref(false)
function resetDrawer(){
  drawer.value = false
}



onMounted(async ()=>{
  console.log(props.type)
  prePage.value = props.type == 'search'? true : false
  handleCurrentChange(1)
  // handleCurrentChange(1)
  // console.log("item"+props.currentNeed.needId)
})



//抽屉方向
const direction = ref('ttb')

const props = defineProps({
    drawer: Boolean,//控制抽屉的变量
    currentNeed:Object,//当前的帖子信息
    type:String,
})
const emit = defineEmits(['reset-drawer'])




const drawerMsg = ref(false)
const activeName = ref('first')
const handleClick = (tab, event) => {
  // console.log(tab, event)
}
</script>
<style scoped>
.send-comment{
  margin-left:  auto;
  margin-top: 10px;
}
.user-info{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.user-info span{
  margin-left: 10px;
}
.user-info span:last-child{
  margin-left: auto;
}
.comment-content{
  margin-top: 20px;
  margin-left: 16px;
  font-size: 14px;
  text-align: left;
  width: 589px;
}
.comment{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.post-comment{
  position: relative;
  
}
.comment-text{
  display: flex;
  flex-direction: column;
  width: 600px;
}
.msg{
    margin-bottom: 20px;
}
.el-drawer::-webkit-scrollbar{
    display: none;
}
.el-drawer{
}
.details{
}
.image-list{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.image-list img{
    width:100%; 
    max-width:500px;
    height: auto;
    margin-top: 10px;
}

</style>