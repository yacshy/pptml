<template>
  <div class="table-con">
    <p class="title">表格</p>
    <div class="inp-con">
      <label>行数：</label>
      <a-input-number :min="1" :max="10" v-model="row" class="inp" />
    </div>
    <div class="inp-con">
      <label>列数：</label>
      <a-input-number :min="1" :max="10" v-model="col" class="inp" />
    </div>
    <footer>
      <a-button type="primary" class="btn" @click="determine">确定</a-button>
    </footer>
  </div>
</template>

<script lang="ts">
import CombinedVueInstance from 'vue'
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class TableList extends Vue {
  $bus!: CombinedVueInstance

  col = 3
  row = 3
  determine(): void {
    this.$bus.$emit('call-painter-ready-insert-table', {
      col: this.col,
      row: this.row
    })
  }
}
</script>

<style lang="scss" scoped>
.table-con {
  width: 256px;
  max-height: 168px;
  .title {
    height: 28px;
    line-height: 28px;
    padding: 0 5px;
    box-sizing: border-box;
    background-color: #ededed;
  }
  .inp-con {
    display: flex;
    width: 100%;
    height: 32px;
    line-height: 32px;
    margin-bottom: 10px;
    label {
      flex: 2;
    }
    .inp {
      flex: 8;
      border-radius: 0;
    }
  }
  .btn {
    width: 100%;
    border-radius: 0;
  }
}
</style>
