<script setup lang="ts">
import { NDataTable } from 'naive-ui'
import { SIMPLE_COLUMNS, SAMPLE_DATA } from '../constants'
</script>

<template>
  <div class="table-variant">
    <h4 class="variant-title">Striped Table</h4>
    <n-data-table
      :columns="SIMPLE_COLUMNS"
      :data="SAMPLE_DATA"
      :pagination="false"
      :striped="true"
    />
  </div>
</template>
