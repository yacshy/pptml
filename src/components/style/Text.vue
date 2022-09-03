<template>
  <div class="fill">
    <row-slot2>
      <a-select :default-value="fontFamily" @change="changeFontType" slot="l" class="select">
        <a-select-option
          v-for="font in systemFonts"
          class="sel"
          :value="font.value"
          :key="font.value"
        >{{font.label}}</a-select-option>
      </a-select>
      <a-select :default-value="fontSize" @change="changeFontSize" slot="r" class="select">
        <a-select-option
          v-for="size in fontSzies"
          class="sel"
          :value="size"
          :key="'font-size_' + size"
        >{{size + 'px'}}</a-select-option>
      </a-select>
    </row-slot2>
    <row-slot4>
      <div class="icon" :class="{ active: style.bold === 'bolder' }" slot="1">
        <a-icon type="bold" @click="blod" />
      </div>
      <div class="icon" slot="2" :class="{ active: style.fontStyle === 'italic' }" @click="italic">
        <a-icon type="italic" />
      </div>
      <div
        class="icon"
        slot="3"
        :class="{ active: style.decoration === 'underline' }"
        @click="underline"
      >
        <a-icon type="underline" />
      </div>
      <div
        class="icon"
        slot="4"
        :class="{ active: style.decoration === 'line-through' }"
        @click="strikethrough"
      >
        <a-icon type="strikethrough" />
      </div>
    </row-slot4>
    <row-slot3>
      <div class="icon" slot="1" :class="{ active: style.textAlign === 'left' }" @click="left">
        <a-icon type="align-left" />
      </div>
      <div class="icon" slot="2" :class="{ active: style.textAlign === 'center' }" @click="center">
        <a-icon type="align-center" />
      </div>
      <div class="icon" slot="3" :class="{ active: style.textAlign === 'right' }" @click="right">
        <a-icon type="align-right" />
      </div>
    </row-slot3>
    <a-divider />
    <row-with-title-slot title="行间距">
      <a-select :default-value="lineSpace" @change="changeLineSpace" class="select">
        <a-select-option
          v-for="space in lineSpaces"
          class="sel"
          :value="space"
          :key="'line-space_' + space"
        >{{space + '倍'}}</a-select-option>
      </a-select>
    </row-with-title-slot>
    <row-with-title-slot title="字间距">
      <a-select :default-value="fontSpace" @change="changeFontSpace" class="select">
        <a-select-option
          v-for="space in fontSpaces"
          class="sel"
          :value="space"
          :key="'font-space_' + space"
        >{{space + 'px'}}</a-select-option>
      </a-select>
    </row-with-title-slot>
    <row-with-title-slot title="文本填充">
      <color-picker :value="background" :change="setFillColor" />
    </row-with-title-slot>
    <row-with-title-slot title="字体颜色">
      <color-picker :value="color" :change="setFontColor" />
    </row-with-title-slot>
    <a-divider />
    <edit-shadow :ele="ele" />
    <edit-border :ele="ele" />
    <edit-opacity :ele="ele" />
  </div>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { IText } from '@/store/pptInterface'
import { SYS_FONTS, ISYS_FONT } from '@/configs/font'
import { afterFindElement } from '@/utils/FormatParma'
import RowSlot2 from '@/components/repack/RowSlot2.vue'
import RowSlot3 from '@/components/repack/RowSlot3.vue'
import RowSlot4 from '@/components/repack/RowSlot4.vue'
import ColorPicker from '@/components/repack/ColorPicker.vue'
import RowWithTitleSlot from '@/components/repack/RowWithTitleSlot.vue'
import EditShadow from '@/components/style/Shadow.vue'
import EditOpacity from '@/components/style/Opacity.vue'
import EditBorder from '@/components/style/Border.vue'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {
    RowSlot2,
    RowSlot3,
    RowSlot4,
    RowWithTitleSlot,
    ColorPicker,
    EditShadow,
    EditOpacity,
    EditBorder
  }
})
export default class EditTextStyle extends Vue {
  get systemFonts(): ISYS_FONT[] {
    return SYS_FONTS
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

  lineSpaces = [0.9, 1, 1.1, 1.2, 1.5, 1.8, 2, 2.2, 2.4, 2.6, 3]

  fontSpaces = [0, 1, 2, 3, 4, 5, 6, 8, 10]

  get ele(): IText {
    return PPTStore.active as IText
  }

  get style(): IText['style'] {
    return this.ele.style
  }

  get fontFamily(): string {
    return this.ele.style.fontFamily
  }

  get fontSize(): number {
    return this.ele.style.fontSize
  }

  get fontSpace(): number {
    return this.ele.style.letterSpacing
  }

  get lineSpace(): number {
    return this.ele.style.lineHeight
  }

  get color(): string {
    return this.ele.style.color
  }

  get background(): string {
    const bg = this.ele.style.background
    return bg === 'transparent' ? '#ffffff' : bg
  }

  changeFontType(fontFamily: string): void {
    PPTStore.setTextElementInfo(afterFindElement({ fontFamily }))
  }

  changeFontSize(fontSize: number): void {
    PPTStore.setTextElementInfo(afterFindElement({ fontSize }))
  }

  changeLineSpace(lineHeight: number): void {
    PPTStore.setTextElementInfo(afterFindElement({ lineHeight }))
  }

  changeFontSpace(letterSpacing: number): void {
    PPTStore.setTextElementInfo(afterFindElement({ letterSpacing }))
  }

  setFillColor(background: string): void {
    PPTStore.setTextElementInfo(afterFindElement({ background }))
  }

  setFontColor(color: string): void {
    PPTStore.setTextElementInfo(afterFindElement({ color }))
  }

  blod(): void {
    PPTStore.setTextElementInfo(
      afterFindElement({
        fontWeight: this.style.fontWeight === 'bolder' ? 'normal' : 'bolder'
      })
    )
  }

  italic(): void {
    PPTStore.setTextElementInfo(
      afterFindElement({
        fontStyle: this.style.fontStyle === 'italic' ? 'normal' : 'italic'
      })
    )
  }

  underline(): void {
    PPTStore.setTextElementInfo(
      afterFindElement({
        decoration: this.style.decoration === 'underline' ? 'none' : 'underline'
      })
    )
  }

  strikethrough(): void {
    PPTStore.setTextElementInfo(
      afterFindElement({
        decoration:
          this.style.decoration === 'line-through' ? 'none' : 'line-through'
      })
    )
  }

  left(): void {
    PPTStore.setTextElementInfo(afterFindElement({ textAlign: 'left' }))
  }

  center(): void {
    PPTStore.setTextElementInfo(
      afterFindElement({
        textAlign: this.style.textAlign === 'center' ? 'left' : 'center'
      })
    )
  }

  right(): void {
    PPTStore.setTextElementInfo(
      afterFindElement({
        textAlign: this.style.textAlign === 'right' ? 'left' : 'right'
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
.icon {
  width: 100%;
  height: 100%;
}
.active {
  background-color: rgb(0, 145, 255);
}
</style>
