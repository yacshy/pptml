<template>
  <div class="row">
    <label>{{title}}：</label>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class RowWithTitleSlot extends Vue {
  @Prop() readonly title!: string
}
</script>

<style lang="scss" scoped>
.row {
  height: 32px;
  line-height: 32px;
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  label {
    flex: 4;
  }
  div {
    flex: 7;
  }
}
</style>
