<template>
    <div>
        <el-table :data="filterTableData" style="width: 100%">
            <el-table-column label="兑换人" prop="name" />
            <el-table-column label="电话" prop="phone" />
            <el-table-column label="地址" prop="region" />
            <el-table-column label="title" prop="title" />
            <el-table-column label="积分" prop="integral" />
            <el-table-column align="right">
              <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
              </template>
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                  >回消息</el-button
                >

                <el-button
                  size="small"
                  type="success"
                  @click="handleThrough(scope.$index, scope.row)"
                  >通过</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >不通过</el-button
                >
              </template>
            </el-table-column>
          </el-table>

            <el-dialog
                v-model="centerDialogVisible"
                title="回消息"
                width="30%"
                destroy-on-close
                center
               >
               <el-input
               v-model="currentMsg.msg"
               :autosize="{ minRows: 2, maxRows: 4 }"
               type="textarea"
               placeholder="请输入快递单号"
             />

               <el-button type="primary" @click="handleSendMsg">
                确定
              </el-button>

              </el-dialog>


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
import {getExchangeList, through,noPass,sendMsg} from '@/api/exchange'

 
const total = ref(10)
const value = ref(true)
const currentPage = ref(1)
const handleCurrentChange = async (val) => {
  let res = await getExchangeList(val)
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
    data.name.toLowerCase().includes(search.value.toLowerCase())
)
)
const currentMsg = reactive({
    msg:'',
    id:'',
})
const handleSendMsg = () =>{
    sendMsg(currentMsg)
    centerDialogVisible.value = false
}

const handleEdit = (index, row) => {
    centerDialogVisible.value = true
    currentMsg.id = row._id
    // let data = {
    //     id:row._id
    // }
    // sendMsg(data)
}

const handleThrough = (index, row )=> {
  through(row._id)
  tableData.value.splice(index, 1)
}

const handleDelete = (index, row )=> {
  noPass(row._id)
  tableData.value.splice(index, 1)
}

//详情
const centerDialogVisible = ref(false)

const currentExchange = ref({})


</script>
  