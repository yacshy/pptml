<template>
  <card-with-switch-and-title title="启用边框" :value="open" :change="borderHandle">
    <div v-show="open">
      <row-with-title-slot title="边框样式">
        <a-select :default-value="type" @change="changeType" class="select">
          <a-select-option class="sel" value="solid">实线边框</a-select-option>
          <a-select-option class="sel" value="dashed">虚线边框</a-select-option>
        </a-select>
      </row-with-title-slot>
      <row-with-title-slot title="边框颜色">
        <color-picker :value="color" :change="setColor" />
      </row-with-title-slot>
      <row-with-title-slot title="模糊距离">
        <a-input-number
          :min="0"
          :max="10"
          :default-value="width"
          @change="changeWidth"
          class="num-inp"
        />
      </row-with-title-slot>
    </div>
  </card-with-switch-and-title>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { IText, IShape } from '@/store/pptInterface'
import { afterFindElement } from '@/utils/FormatParma'
import ColorPicker from '@/components/repack/ColorPicker.vue'
import RowWithTitleSlot from '@/components/repack/RowWithTitleSlot.vue'
import CardWithSwitchAndTitle from '@/components/repack/CardWithSwitchAndTitle.vue'
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  components: { ColorPicker, RowWithTitleSlot, CardWithSwitchAndTitle }
})
export default class EditBorder extends Vue {
  @Prop() readonly ele!: IText | IShape

  get open(): boolean {
    return this.ele.border.open
  }

  get type(): string {
    return this.ele.border.type
  }

  get width(): number {
    return this.ele.border.width
  }

  get color(): string {
    return this.ele.border.color
  }

  borderHandle(open: boolean): void {
    PPTStore.setElementBorder(afterFindElement({ open }))
  }

  changeType(type: string): void {
    PPTStore.setElementBorder(afterFindElement({ type }))
  }

  setColor(color: string): void {
    PPTStore.setElementBorder(afterFindElement({ color }))
  }

  changeWidth(width: number): void {
    PPTStore.setElementBorder(afterFindElement({ width }))
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/selectRadius.scss';
.num-inp {
  width: 100%;
  border-radius: 0;
}
.select {
  width: 100%;
  @include radius;
}
</style>
