<template>
  <div class="row">
    <div>
      <slot name="l"></slot>
    </div>
    <div>
      <slot name="r"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class RowSlot2 extends Vue {}
</script>

<style lang="scss" scoped>
.row {
  height: 32px;
  line-height: 32px;
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  div {
    flex: 1;
    &:nth-child(1) {
      margin-right: 5px;
    }
    &:nth-child(2) {
      margin-left: 5px;
    }
  }
}
</style>
