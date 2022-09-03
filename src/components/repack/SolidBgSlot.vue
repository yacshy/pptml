<template>
  <div class="solid-bg-con flex">
    <div class="slot">
      <slot></slot>
    </div>
    <input type="color" ref="picker" :value="color" @change="setPPTBackground" class="picker" />
  </div>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { afterFindPpt } from '@/utils/FormatParma'
import { Vue, Component, Ref } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class SolidBackgroundSlot extends Vue {
  @Ref('picker') readonly picker!: HTMLInputElement
  get color(): string {
    return PPTStore.ppt.background.solid
  }

  setPPTBackground(): void {
    PPTStore.setPPTBaseInfo(afterFindPpt({ solid: this.picker.value }))
  }
}
</script>

<style lang="scss" scoped>
.solid-bg-con {
  width: 100%;
  height: auto;
  .slot {
    width: 50%;
    margin-right: 5px;
  }
  .picker {
    margin-left: 5px;
    width: 50%;
    height: 32px;
    border: 1px solid #d9d9d9;
    background-color: #ffffff;
  }
}
</style>
