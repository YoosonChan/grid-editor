<script setup lang="ts">
import { reactive, ref } from 'vue';
import { SETTINGS, TableCellDataType } from './utils/table';
import { HotTable } from '@handsontable/vue3';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css'
// register Handsontable's modules
registerAllModules()
// basic configuratin
const size = reactive({ row: 10, col: 10 })
const type = ref<TableCellDataType>('text')

// table data
const data = ref()

// render method
const renderGrid = () => {
}

// event handler
const handleClickUpdate = () => {
  renderGrid()
}
</script>

<template>
  <div class="container p-6">
    <a-space>
      <a-input-number v-model="size.row" class="!w-24"><template #append>行</template></a-input-number>
      <a-input-number v-model="size.col" class="!w-24"><template #append>列</template></a-input-number>
      <span>类型</span>
      <a-select v-model="type" class="!w-27">
        <a-option value="text" class="!w-27">text</a-option>
        <a-option value="checkbox" class="!w-27">checkbox</a-option>
        <a-option value="dropdown" class="!w-27">dropdown</a-option>
      </a-select>
      <a-button @click="handleClickUpdate" type="primary">更新</a-button>
    </a-space>
    <a-divider />
    <hot-table :data="data" rowHeaders colHeaders :settings="SETTINGS"></hot-table>
    <a-divider />
  </div>
</template>
./utils/table