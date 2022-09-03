<template>
  <a-slider :min="0" :max="100" :default-value="opacity" @change="changeOpacity" />
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { IPPTBase } from '@/store/pptInterface'
import { afterFindElement } from '@/utils/FormatParma'
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class EditOpacity extends Vue {
  @Prop() readonly ele!: IPPTBase

  get opacity(): number {
    return this.ele.opacity * 100
  }

  changeOpacity(value: number): void {
    PPTStore.setElementBaseInfo(afterFindElement({ opacity: value / 100 }))
  }
}
</script>

<style lang="scss" scoped>
</style>
