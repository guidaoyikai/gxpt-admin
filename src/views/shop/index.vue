<template>
    <div>
        <div>
          <el-button 
            type="primary"
            @click="addShopDialog = true"
          >
            发布
          </el-button>
          <el-dialog v-model="addShopDialog" title="积分商品信息">
            
            <el-form
            :label-position="'top'"
            label-width="100px"
            :model="shopFrom"
            style="max-width: 460px"
          >
            <el-form-item label="标题">
              <el-input v-model="shopFrom.title" />
            </el-form-item>
            <el-form-item label="价值">
              <el-input-number v-model="shopFrom.worth" :min="0"  />

            </el-form-item>
            <el-form-item label="数量">
              <el-input-number v-model="shopFrom.quantity" :min="1"  />

            </el-form-item>
            <el-form-item label="积分">
              <el-input-number v-model="shopFrom.integral" :min="0"  />
            </el-form-item>

      
      
            <el-form-item label="图片上传">
              <el-upload 
                ref="uploadRef" 
                action="#" 
                list-type="picture-card" 
                :auto-upload="false"
                :multiple = "true"
                :http-request="myUpload" 
                v-model:file-list = "shopFrom.fileList"
                >
                  <el-icon><IEpPlus /></el-icon>
                  <template #file="{ file }">
                    <div>
                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                      <span class="el-upload-list__item-actions">
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                        >
                        
                          <el-icon><IEpDelete /></el-icon>
                        </span>
                      </span>
                    </div>
                  </template>
                </el-upload>
            </el-form-item>
            <el-form-item label="描述">
              <el-input
                  v-model="shopFrom.textarea"
                  maxlength="120"
                  placeholder="输入描述"
                  show-word-limit
                  type="textarea"
                  rows="8"
              />
            </el-form-item>
            <el-form-item>
              <el-button 
                type="primary"
                @click="createPublish(shopFrom)"
                >发布</el-button>
            </el-form-item>
          </el-form>
          </el-dialog>


        </div>
        <el-table :data="filterTableData" style="width: 100%">
            <el-table-column label="价值" prop="worth" />
            <el-table-column label="标题" prop="title" />
            <el-table-column label="数量" prop="quantity" />
            <el-table-column label="积分" prop="integral" />
            <el-table-column label="日期" prop="publish_time" />
            <el-table-column align="right">
              <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
              </template>
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                  >查看</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <AwardFrom
          :awardFromDrawer="awardFromDrawer"
           @reset-drawer="resetDrawer"
           :shopInfo = "shopInfo"
           >
           </AwardFrom>




          <el-pagination 
              layout="prev, pager, next" 
              :pageSize="10" :total="total"
              :hide-on-single-page="value"
              v-model:current-page="currentPage"
              @current-change="handleCurrentChange"
          />
    </div>
    

</template>
  
<script lang="ts" setup>
import { computed, ref,watch,onMounted,reactive } from 'vue'
import {getShopList,down,publish} from '@/api/shop'
import AwardFrom from './component/AwardForm.vue'
import {uuid} from '@/utils/uuid'

//上传积分商品
const addShopDialog = ref(false)
const disabled = ref(false)
const shopFrom = reactive({
    title: '',
    worth: 0,
    textarea:'',
    fileList:[],
    quantity:1,
    integral:0
})

//发布函数
async function createPublish(shopFrom){
  let data = new FormData();
  //图片
  let {fileList, ...rest} = {...shopFrom}

  data.append('data', JSON.stringify({
    ...rest,
    id:uuid()})
    )
    data.append('fileList', shopFrom.fileList[0].raw)
  let res = await publish(data,{headers: {'Content-Type': 'multipart/form-data'}})
  if(res.data.code == 10000){
    ElMessage({
        message: "发布成功",
        type: 'success',
      })
      addShopDialog.value = false
  }else{
   
    ElMessage({
        message:"发布失败,"+ res.data.msg,
        type: 'warning',
      })
  }
}
 
const total = ref(10)
const value = ref(true)
const currentPage = ref(1)
const handleCurrentChange = async (val) => {
  let res = await getShopList(val)
  tableData.value = res.data.data
  total.value = res.data.total
}

onMounted(()=>{
 handleCurrentChange(1)
})
//
const tableData= ref([])
const search = ref('')
const filterTableData = computed(() =>
tableData.value.filter(
    (data) =>
    !search.value ||
    data.nickname.toLowerCase().includes(search.value.toLowerCase())
)
)
const handleEdit = (index, row) => {
  awardFromDrawer.value = true
  shopInfo.value = row
}

const handleDelete = (index, row )=> {
  down(row.id)
  tableData.value.splice(index, 1)
}

//详情
let awardFromDrawer = ref(false)
function resetDrawer(){
    awardFromDrawer.value = false
}
const shopInfo = ref({})


</script>
  