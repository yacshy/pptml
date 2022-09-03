<template>
  <div class="fill">
    <div style="width: 100%;" v-if="cell.length > 0">
      <row-slot2>
        <a-select
          :default-value="cellstyle.fontFamily"
          @change="changeFontType"
          slot="l"
          class="select"
        >
          <a-select-option
            v-for="font in systemFonts"
            class="sel"
            :value="font.value"
            :key="font.value"
          >{{font.label}}</a-select-option>
        </a-select>
        <a-select
          :default-value="cellstyle.fontSize"
          @change="changeFontSize"
          slot="r"
          class="select"
        >
          <a-select-option
            v-for="size in fontSzies"
            class="sel"
            :value="size"
            :key="'font-size_' + size"
          >{{size + 'px'}}</a-select-option>
        </a-select>
      </row-slot2>
      <row-slot4>
        <div
          class="icon"
          slot="1"
          :class="{ active: cellstyle.fontWeight === 'bolder' }"
          @click="blod"
        >
          <a-icon type="bold" />
        </div>
        <div
          class="icon"
          slot="2"
          :class="{ active: cellstyle.fontStyle === 'italic' }"
          @click="italic"
        >
          <a-icon type="italic" />
        </div>
        <div
          class="icon"
          slot="3"
          :class="{ active: cellstyle.decoration === 'underline' }"
          @click="underline"
        >
          <a-icon type="underline" />
        </div>
        <div
          class="icon"
          slot="4"
          :class="{ active: cellstyle.decoration === 'line-through' }"
          @click="strikethrough"
        >
          <a-icon type="strikethrough" />
        </div>
      </row-slot4>
      <row-slot3>
        <div
          class="icon"
          slot="1"
          :class="{ active: cellstyle.textAlign === 'left' }"
          @click="left"
        >
          <a-icon type="align-left" />
        </div>
        <div
          class="icon"
          slot="2"
          :class="{ active: cellstyle.textAlign === 'center' }"
          @click="center"
        >
          <a-icon type="align-center" />
        </div>
        <div
          class="icon"
          slot="3"
          :class="{ active: cellstyle.textAlign === 'right' }"
          @click="right"
        >
          <a-icon type="align-right" />
        </div>
      </row-slot3>
      <row-with-title-slot title="文本填充">
        <color-picker :value="cellstyle.background" :change="setCellBackground" />
      </row-with-title-slot>
      <row-with-title-slot title="字体颜色">
        <color-picker :value="cellstyle.color" :change="setCellColor" />
      </row-with-title-slot>
    </div>
    <div style="width: 100%;" v-else-if="cell.length === 0">
      <row-with-title-slot title="边框颜色">
        <color-picker :value="ele.borderColor" :change="setBorderColor" />
      </row-with-title-slot>
      <row-with-title-slot title="边框宽度">
        <a-input-number
          :min="1"
          :max="10"
          :default-value="ele.borderWidth"
          @change="setBorderWidth"
          class="num-inp"
        />
      </row-with-title-slot>
    </div>
  </div>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { SYS_FONTS, ISYS_FONT } from '@/configs/font'
import { ITable, ITableCell } from '@/store/pptInterface'
import { afterFindTableCell, afterFindElement } from '@/utils/FormatParma'
import RowSlot2 from '@/components/repack/RowSlot2.vue'
import RowSlot3 from '@/components/repack/RowSlot3.vue'
import RowSlot4 from '@/components/repack/RowSlot4.vue'
import ColorPicker from '@/components/repack/ColorPicker.vue'
import RowWithTitleSlot from '@/components/repack/RowWithTitleSlot.vue'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {
    RowSlot2,
    RowSlot3,
    RowSlot4,
    ColorPicker,
    RowWithTitleSlot
  }
})
export default class EditTableStyle extends Vue {
  get ele(): ITable {
    return PPTStore.active as ITable
  }

  get systemFonts(): ISYS_FONT[] {
    return SYS_FONTS
  }

  get cell(): number[] {
    return this.ele.activecell
  }

  get cellstyle(): ITableCell {
    const [i, j] = this.cell
    return this.ele.table[i][j]
  }

  fontSzies = [
    12,
    14,
    16,
    18,
    20,
    22,
    24,
    28,
    32,
    36,
    40,
    44,
    48,
    54,
    60,
    66,
    72,
    76,
    80,
    88,
    96,
    102,
    114
  ]

  setBorderColor(borderColor: string): void {
    PPTStore.setTableElementInfo(afterFindElement({ borderColor }))
  }

  setBorderWidth(borderWidth: number): void {
    PPTStore.setTableElementInfo(afterFindElement({ borderWidth }))
  }

  setCellBackground(background: string): void {
    PPTStore.setTableElementCell(afterFindTableCell({ background }))
  }

  setCellColor(color: string): void {
    PPTStore.setTableElementCell(afterFindTableCell({ color }))
  }

  changeFontType(fontFamily: string): void {
    PPTStore.setTableElementCell(afterFindTableCell({ fontFamily }))
  }

  changeFontSize(fontSize: number): void {
    PPTStore.setTableElementCell(afterFindTableCell({ fontSize }))
  }

  blod(): void {
    PPTStore.setTableElementCell(
      afterFindTableCell({
        fontWeight: this.cellstyle.fontWeight === 'bolder' ? 'normal' : 'bolder'
      })
    )
  }

  italic(): void {
    PPTStore.setTableElementCell(
      afterFindTableCell({
        fontStyle: this.cellstyle.fontStyle === 'italic' ? 'normal' : 'italic'
      })
    )
  }

  underline(): void {
    PPTStore.setTableElementCell(
      afterFindTableCell({
        decoration:
          this.cellstyle.decoration === 'underline' ? 'none' : 'underline'
      })
    )
  }

  strikethrough(): void {
    PPTStore.setTableElementCell(
      afterFindTableCell({
        decoration:
          this.cellstyle.decoration === 'line-through' ? 'none' : 'line-through'
      })
    )
  }

  left(): void {
    PPTStore.setTableElementCell(
      afterFindTableCell({
        textAlign: 'left'
      })
    )
  }

  center(): void {
    PPTStore.setTableElementCell(
      afterFindTableCell({
        textAlign: this.cellstyle.textAlign === 'center' ? 'left' : 'center'
      })
    )
  }

  right(): void {
    PPTStore.setTableElementCell(
      afterFindTableCell({
        textAlign: this.cellstyle.textAlign === 'right' ? 'left' : 'right'
      })
    )
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
.active {
  background-color: rgb(0, 145, 255);
}
</style>
