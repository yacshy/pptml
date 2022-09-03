<template>
  <div class="fill">
    <p class="title">背景填充</p>
    <component :is="bgTypeSlotName">
      <a-select :default-value="backgroundType" @change="changeBackgroundType" class="bgtype-sel">
        <a-select-option value="solid">纯色填充</a-select-option>
        <a-select-option value="image">图片填充</a-select-option>
        <a-select-option value="grandient">渐变填充</a-select-option>
      </a-select>
    </component>
    <a-button @click="useCurrentBgToAll" class="fill-btn">应用背景到全部</a-button>
    <a-divider />
    <row-with-title-slot title="画布尺寸">
      <a-select :default-value="ratio" @change="setPptSize" class="bgtype-sel">
        <a-select-option value="16-9">宽屏 16 : 9</a-select-option>
        <a-select-option value="16-10">宽屏 16 : 10</a-select-option>
        <a-select-option value="4-3">标准 4 : 3</a-select-option>
      </a-select>
    </row-with-title-slot>
    <a-divider />
    <p class="title">全局主题</p>
    <row-with-title-slot title="字体样式">
      <a-select :default-value="fontFamily" @change="setFontFamily" class="bgtype-sel">
        <a-select-option
          v-for="font in systemFonts"
          :value="font.value"
          :key="font.value"
        >{{font.label}}</a-select-option>
      </a-select>
    </row-with-title-slot>
    <row-with-title-slot title="字体颜色">
      <color-picker :value="fontColor" :change="setFontColor" />
    </row-with-title-slot>
    <row-with-title-slot title="主题颜色">
      <color-picker :value="themeColor" :change="setThemeColor" />
    </row-with-title-slot>
    <p class="title">预置主题</p>
    <div class="theme-con flex">
      <div v-for="(theme, index) in presetThemes" class="theme" :key="'theme' + index">
        <div @click="setTheme(theme)" class="fill bg" :style="{ background: theme.background }">
          <div class="text" :style="{ color: theme.text }">Aa</div>
          <div class="ele" :style="{ background: theme.color }"></div>
        </div>
      </div>
    </div>
    <a-button @click="useCurrentThemeToAll" class="fill-btn">应用主题到全部</a-button>
  </div>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { IPPT } from '@/store/pptInterface'
import { SYS_FONTS, ISYS_FONT } from '@/configs/font'
import { PRESET_THEMES, IThemes } from '@/configs/theme'
import { afterFindPpt } from '@/utils/FormatParma'
import ColorPicker from '@/components/repack/ColorPicker.vue'
import SolidBackgroundSlot from '@/components/repack/SolidBgSlot.vue'
import ImageBackgroundSlot from '@/components/repack/ImageBgSlot.vue'
import GrandientBackgroundSlot from '@/components/repack/GrandientBgSlot.vue'
import RowWithTitleSlot from '@/components/repack/RowWithTitleSlot.vue'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {
    ColorPicker,
    SolidBackgroundSlot,
    ImageBackgroundSlot,
    GrandientBackgroundSlot,
    RowWithTitleSlot
  }
})
export default class EditPptStyle extends Vue {
  get systemFonts(): ISYS_FONT[] {
    return SYS_FONTS
  }

  get presetThemes(): IThemes[] {
    return PRESET_THEMES
  }

  get ppt(): IPPT {
    return PPTStore.ppt
  }

  get backgroundType(): string {
    return PPTStore.ppt.background.type
  }

  get bgTypeSlotName(): string {
    const type = PPTStore.ppt.background.type
    if (type === 'solid') return 'SolidBackgroundSlot'
    if (type === 'image') return 'ImageBackgroundSlot'
    return 'GrandientBackgroundSlot'
  }

  get ratio(): string {
    return PPTStore.ppt.ratio.label
  }

  get fontFamily(): string {
    return PPTStore.ppt.fontFamily
  }

  get fontColor(): string {
    return PPTStore.ppt.fontColor
  }

  get themeColor(): string {
    return PPTStore.ppt.themeColor
  }

  changeBackgroundType(type: string): void {
    PPTStore.setPPTBaseInfo(afterFindPpt({ type }))
  }

  useCurrentBgToAll(): void {
    PPTStore.useCurrentBGToAllPPt(PPTStore.pptIndex)
  }

  setPptSize(ratio: string): void {
    const label = ratio
    let value!: number[]
    if (ratio === '16-9') {
      value = [1000, 562.5]
    } else if (ratio === '16-10') {
      value = [1000, 625]
    } else {
      value = [1000, 750]
    }
    PPTStore.setPPTBaseInfo(afterFindPpt({ ratio: { label, value } }))
  }

  setFontFamily(fontFamily: string): void {
    PPTStore.setPPTBaseInfo(afterFindPpt({ fontFamily }))
  }

  setFontColor(fontColor: string): void {
    PPTStore.setPPTBaseInfo(afterFindPpt({ fontColor }))
  }

  setThemeColor(themeColor: string): void {
    PPTStore.setPPTBaseInfo(afterFindPpt({ themeColor }))
  }

  setTheme(theme: IThemes): void {
    this.setFontColor(theme.text)
    this.setThemeColor(theme.color)
    this.changeBackgroundType('solid')
    PPTStore.setPPTBaseInfo(afterFindPpt({ solid: theme.background }))
  }

  useCurrentThemeToAll(): void {
    PPTStore.useCurrentThemeToAllPPt(PPTStore.pptIndex)
  }
}
</script>

<style lang="scss" scoped>
.title {
  padding: 0 5px;
  font-size: 15px;
  font-weight: 600;
}
.bgtype-sel {
  width: 100%;
  ::v-deep(.ant-select-selection) {
    border-radius: 0;
  }
}
.fill-btn {
  margin-top: 10px;
  width: 100%;
  border-radius: 0;
}
.theme-con {
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  .theme {
    width: 25%;
    height: 60px;
    padding: 5px;
    box-sizing: border-box;
    .bg {
      padding: 10px;
      cursor: pointer;
      &:hover {
        box-shadow: 0 0 3px #d9d9d9;
      }
      .text {
        height: 20px;
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
        text-align: center;
      }
      .ele {
        height: 10px;
      }
    }
  }
}
</style>
