<template>
    <div>
        <el-table :data="filterTableData" style="width: 100%">
            <el-table-column label="Name" prop="nickname" />
            <el-table-column label="title" prop="title" />
            <el-table-column label="Date" prop="publish_time" />
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

          <NeedDetails
          :currentNeed = "currentNeed"
          :drawer="drawer"
          :type="'search'"
           @reset-drawer="resetDrawer"
           v-if="drawer"
           >
         </NeedDetails>


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
import { computed, ref,watch,onMounted } from 'vue'
import {getNeedList, through,noPass} from '@/api/need'
import NeedDetails from './components/NeedDetails.vue'

 
const total = ref(10)
const value = ref(true)
const currentPage = ref(1)
const handleCurrentChange = async (val) => {
  let res = await getNeedList(val)
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
  drawer.value = true
  currentNeed.value = row
}

const handleThrough = (index, row )=> {
  through(row.needId)
  tableData.value.splice(index, 1)
}

const handleDelete = (index, row )=> {
  noPass(row.needId)
  tableData.value.splice(index, 1)
}

//详情
let drawer = ref(false)
function resetDrawer(){
  drawer.value = false
}
const currentNeed = ref({})


</script>
  