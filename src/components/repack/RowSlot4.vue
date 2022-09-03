<template>
  <div class="row">
    <div>
      <slot name="1"></slot>
    </div>
    <div class="d2">
      <slot name="2"></slot>
    </div>
    <div class="d3">
      <slot name="3"></slot>
    </div>
    <div>
      <slot name="4"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class RowSlot4 extends Vue {}
</script>

<style lang="scss" scoped>
.row {
  height: 32px;
  line-height: 32px;
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  border: 1px solid #d9d9dd;
  div {
    flex: 1;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
    &:hover {
      background-color: rgb(0, 145, 255);
      color: #ffffff;
    }
  }
  .active {
    background-color: rgb(0, 145, 255);
    color: #ffffff;
  }
  .d2,
  .d3 {
    border-left: 1px solid #d9d9dd;
  }
  .d3 {
    border-right: 1px solid #d9d9dd;
  }
}
</style>
