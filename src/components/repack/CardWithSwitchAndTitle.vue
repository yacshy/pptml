<template>
  <div class="con">
    <div class="switch-box flex">
      <label>{{title}}</label>
      <a-switch :default-checked="value" @change="onChange" class="switch" />
    </div>
    <div class="option">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class CardWithSwitchAndTitle extends Vue {
  @Prop() readonly title!: string
  @Prop() readonly value!: boolean
  @Prop() readonly change!: (value: boolean) => void

  onChange(value: boolean): void {
    this.change(value)
  }
}
</script>

<style lang="scss" scoped>
.con {
  width: 100%;
  height: auto;
  .switch-box {
    width: 100%;
    height: 32px;
    label {
      flex: 8;
    }
    .switch {
      flex: 2;
    }
  }
  .option {
    width: 100%;
    height: auto;
  }
}
</style>
