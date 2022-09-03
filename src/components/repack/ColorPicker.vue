<template>
  <input type="color" :value="value" @change="changeHandle" ref="picker" class="picker" />
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
@Component
export default class ColorPicker extends Vue {
  @Prop() readonly value!: string
  @Prop() readonly change!: (color: string) => void

  @Ref('picker') readonly picker!: HTMLInputElement

  changeHandle(): void {
    this.change(this.picker.value)
  }
}
</script>

<style lang="scss" scoped>
.picker {
  width: 100%;
  height: 32px;
  border: 1px solid #d9d9d9;
  background-color: #ffffff;
}
</style>
