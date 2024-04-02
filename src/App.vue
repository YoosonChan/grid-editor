<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { reactive, ref, unref } from 'vue';
import { ColumnDefs, GridOptions } from './utils/grid';

const size = reactive({ row: 10, col: 10 })
const type = ref<'text' | 'boolean'>('text')

const columnDefs = ref<ColumnDefs[]>()
const rowData = ref()

const renderGrid = () => {
  const options = new GridOptions(unref(size), type.value).getOptions()
  columnDefs.value = options.columnDefs
  rowData.value = options.rowData
}
const handleClickUpdate = () => {
  renderGrid()
}

const handleCellValueChanged = (event: any) => {
  console.log('data changed=> ', event.data);
}
</script>

<template>
  <div class="container p-6">
    <a-space>
      <a-input-number v-model="size.row" class="!w-24"><template #append>行</template></a-input-number>
      <a-input-number v-model="size.col" class="!w-24"><template #append>列</template></a-input-number>
      <span>类型</span>
      <a-select v-model="type" class="!w-27">
        <a-option value="text">text</a-option>
        <a-option value="boolean">boolean</a-option>
      </a-select>
      <a-button @click="handleClickUpdate" type="primary">更新</a-button>
    </a-space>
    <a-divider />
    <div>
      <ag-grid-vue :rowData="rowData" :columnDefs="columnDefs" @cell-value-changed="handleCellValueChanged"
        style="height: 500px" class="ag-theme-quartz"></ag-grid-vue>
    </div>
    <a-divider />
  </div>
</template>
