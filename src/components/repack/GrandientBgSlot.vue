<template>
  <div class="grandient-bg-con">
    <div class="type flex">
      <div class="slot">
        <slot></slot>
      </div>
      <a-select :default-value="type" @change="setType" class="gd-type-sel">
        <a-select-option value="linear">线性渐变</a-select-option>
        <a-select-option value="radial">径向渐变</a-select-option>
      </a-select>
    </div>

    <div class="picker-grup flex">
      <div>
        <label>起点颜色：</label>
        <input
          type="color"
          ref="startPicker"
          :value="startColor"
          @change="seStartColor"
          class="picker"
        />
      </div>
      <div>
        <label>终点颜色：</label>
        <input type="color" ref="endPicker" :value="endColor" @change="setEndColor" class="picker" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { afterFindPpt } from '@/utils/FormatParma'
import { Vue, Component, Ref } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class GrandientBackgroundSlot extends Vue {
  @Ref('startPicker') readonly startPicker!: HTMLInputElement
  @Ref('endPicker') readonly endPicker!: HTMLInputElement

  get type(): string {
    return PPTStore.ppt.background.gradient.type
  }

  get startColor(): string {
    return PPTStore.ppt.background.gradient.start
  }

  get endColor(): string {
    return PPTStore.ppt.background.gradient.end
  }

  setType(grandientType: string): void {
    PPTStore.setPPTBaseInfo(afterFindPpt({ grandientType }))
  }

  seStartColor(): void {
    PPTStore.setPPTBaseInfo(
      afterFindPpt({ grandientStart: this.startPicker.value })
    )
  }

  setEndColor(): void {
    PPTStore.setPPTBaseInfo(
      afterFindPpt({ grandientEnd: this.endPicker.value })
    )
  }
}
</script>

<style lang="scss" scoped>
.grandient-bg-con {
  width: 100%;
  height: auto;
  .type {
    width: 100%;
    height: auto;
    .slot {
      flex: 1;
      margin-right: 5px;
    }
    .gd-type-sel {
      flex: 1;
      margin-left: 5px;
      border-radius: 0;
      ::v-deep(.ant-select-selection) {
        border-radius: 0;
      }
    }
  }
  .picker-grup {
    width: 100%;
    height: auto;
    flex-wrap: wrap;
    div {
      width: 100%;
      display: flex;
      line-height: 32px;
      margin-top: 10px;
      label {
        flex: 4;
      }
      input {
        flex: 7;
        height: 32px;
        border: 1px solid #d9d9d9;
        background-color: #ffffff;
      }
    }
  }
}
</style>
