<template>
  <div class="fill">
    <row-with-title-slot title="线条样式">
      <a-select :default-value="line.style" @change="setStyle" class="select">
        <a-select-option value="solid">实线</a-select-option>
        <a-select-option value="dashed">虚线</a-select-option>
      </a-select>
    </row-with-title-slot>
    <row-with-title-slot title="线条颜色">
      <color-picker :value="ele.stroke" :change="setColor" />
    </row-with-title-slot>
    <row-with-title-slot title="线条宽度">
      <a-input-number
        :min="0"
        :max="10"
        :default-value="ele.height"
        @change="setHeight"
        class="num-inp"
      />
    </row-with-title-slot>
    <row-with-title-slot title="起点样式">
      <a-select :default-value="line.points[0]" @change="setPointStart" class="select">
        <a-select-option value>无</a-select-option>
        <a-select-option value="arrow">箭头</a-select-option>
        <a-select-option value="dot">圆头</a-select-option>
      </a-select>
    </row-with-title-slot>
    <row-with-title-slot title="终点样式">
      <a-select :default-value="line.points[1]" @change="setPointEnd" class="select">
        <a-select-option value>无</a-select-option>
        <a-select-option value="arrow">箭头</a-select-option>
        <a-select-option value="dot">圆头</a-select-option>
      </a-select>
    </row-with-title-slot>
    <a-divider />
    <edit-shadow :ele="ele" />
  </div>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { ILine } from '@/store/pptInterface'
import { LinePoolItem } from '@/configs/lines'
import { afterFindElement } from '@/utils/FormatParma'
import EditShadow from '@/components/style/Shadow.vue'
import ColorPicker from '@/components/repack/ColorPicker.vue'
import RowWithTitleSlot from '@/components/repack/RowWithTitleSlot.vue'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {
    EditShadow,
    ColorPicker,
    RowWithTitleSlot
  }
})
export default class EditLineStyle extends Vue {
  get ele(): ILine {
    return PPTStore.active as ILine
  }

  get line(): LinePoolItem {
    return this.ele.line
  }

  setStyle(style: string): void {
    PPTStore.setLineElementStyle(afterFindElement({ style }))
  }

  setColor(stroke: string): void {
    PPTStore.setLineElementStyle(afterFindElement({ stroke }))
  }

  setHeight(height: number): void {
    PPTStore.setElementBaseInfo(afterFindElement({ height }))
  }

  setPointStart(pointsStart: string): void {
    PPTStore.setLineElementStyle(afterFindElement({ pointsStart }))
  }

  setPointEnd(pointsEnd: string): void {
    PPTStore.setLineElementStyle(afterFindElement({ pointsEnd }))
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/selectRadius.scss';
.select {
  width: 100%;
  @include radius;
}
.num-inp {
  width: 100%;
  border-radius: 0;
}
</style>
