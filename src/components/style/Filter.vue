<template>
  <card-with-switch-and-title title="启用滤镜" :value="open" :change="filterHandle">
    <div v-show="open">
      <row-with-title-slot title="模糊">
        <a-slider :default-value="blur" @change="setBlur" />
      </row-with-title-slot>
      <row-with-title-slot title="亮度">
        <a-slider :default-value="brightness" :min="0" :max="200" @change="setBright" />
      </row-with-title-slot>
      <row-with-title-slot title="对比度">
        <a-slider :default-value="contrast" :min="0" :max="200" @change="setContrast" />
      </row-with-title-slot>
      <row-with-title-slot title="灰度">
        <a-slider :default-value="grayscale" @change="setGrayscale" />
      </row-with-title-slot>
      <row-with-title-slot title="饱和度">
        <a-slider :default-value="saturate" :min="0" :max="200" @change="setStaturate" />
      </row-with-title-slot>
      <row-with-title-slot title="色相">
        <a-slider :default-value="hueRotate" :min="0" :max="360" @change="setHueRotate" />
      </row-with-title-slot>
    </div>
  </card-with-switch-and-title>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { IImage } from '@/store/pptInterface'
import { afterFindElement } from '@/utils/FormatParma'
import ColorPicker from '@/components/repack/ColorPicker.vue'
import RowWithTitleSlot from '@/components/repack/RowWithTitleSlot.vue'
import CardWithSwitchAndTitle from '@/components/repack/CardWithSwitchAndTitle.vue'
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  components: { ColorPicker, RowWithTitleSlot, CardWithSwitchAndTitle }
})
export default class EditFilter extends Vue {
  @Prop() readonly ele!: IImage

  get filter(): IImage['filter'] {
    return this.ele.filter
  }

  get open(): boolean {
    return this.filter.open
  }

  get blur(): number {
    return this.filter.blur * 10
  }

  get brightness(): number {
    return this.filter.brightness
  }

  get contrast(): number {
    return this.filter.contrast
  }

  get grayscale(): number {
    return this.filter.grayscale
  }

  get saturate(): number {
    return this.filter.saturate
  }

  get hueRotate(): number {
    return this.filter.hueRotate
  }

  filterHandle(open: boolean): void {
    PPTStore.setImageElementFilter(afterFindElement({ open }))
  }

  setBlur(blur: number): void {
    PPTStore.setImageElementFilter(afterFindElement({ blur: blur / 10 }))
  }

  setBright(bright: number): void {
    PPTStore.setImageElementFilter(afterFindElement({ brightness: bright }))
  }

  setContrast(cont: number): void {
    PPTStore.setImageElementFilter({
      i: PPTStore.pptIndex,
      j: PPTStore.activeIndex,
      data: { contrast: cont }
    })
  }

  setGrayscale(gray: number): void {
    PPTStore.setImageElementFilter(afterFindElement({ grayscale: gray }))
  }

  setStaturate(statu: number): void {
    PPTStore.setImageElementFilter(afterFindElement({ saturate: statu }))
  }

  setHueRotate(hue: number): void {
    PPTStore.setImageElementFilter(afterFindElement({ hueRotate: hue }))
  }
}
</script>

<style lang="scss" scoped>
.num-inp {
  width: 100%;
  border-radius: 0;
}
</style>
