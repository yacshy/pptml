<template>
  <card-with-switch-and-title title="启用阴影" :value="shadow" :change="shadowHandle">
    <div v-show="shadow">
      <row-with-title-slot title="水平阴影">
        <a-input-number
          :min="-10"
          :max="10"
          :default-value="shadowX"
          @change="changeShadowX"
          class="num-inp"
        />
      </row-with-title-slot>
      <row-with-title-slot title="垂直阴影">
        <a-input-number
          :min="-10"
          :max="10"
          :default-value="shadowY"
          @change="changeShadowY"
          class="num-inp"
        />
      </row-with-title-slot>
      <row-with-title-slot title="模糊距离">
        <a-input-number
          :min="0"
          :max="10"
          :default-value="shadowW"
          @change="changeShadowW"
          class="num-inp"
        />
      </row-with-title-slot>
      <row-with-title-slot title="模糊距离">
        <color-picker :value="shadowColor" :change="changeShadowColor" />
      </row-with-title-slot>
    </div>
  </card-with-switch-and-title>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { IPPTBase } from '@/store/pptInterface'
import { afterFindElement } from '@/utils/FormatParma'
import ColorPicker from '@/components/repack/ColorPicker.vue'
import RowWithTitleSlot from '@/components/repack/RowWithTitleSlot.vue'
import CardWithSwitchAndTitle from '@/components/repack/CardWithSwitchAndTitle.vue'
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  components: { ColorPicker, RowWithTitleSlot, CardWithSwitchAndTitle }
})
export default class EditShadow extends Vue {
  @Prop() readonly ele!: IPPTBase

  get shadow(): boolean {
    return this.ele.shadow.open
  }

  get shadowX(): number {
    return this.ele.shadow.x
  }

  get shadowY(): number {
    return this.ele.shadow.y
  }

  get shadowW(): number {
    return this.ele.shadow.w
  }

  get shadowColor(): string {
    return this.ele.shadow.color
  }

  shadowHandle(open: boolean): void {
    PPTStore.setElementShadow(afterFindElement({ open }))
  }

  changeShadowX(x: number): void {
    PPTStore.setElementShadow(afterFindElement({ x }))
  }

  changeShadowY(y: number): void {
    PPTStore.setElementShadow(afterFindElement({ y }))
  }

  changeShadowW(w: number): void {
    PPTStore.setElementShadow(afterFindElement({ w }))
  }

  changeShadowColor(color: string): void {
    PPTStore.setElementShadow(afterFindElement({ color }))
  }
}
</script>

<style lang="scss" scoped>
.num-inp {
  width: 100%;
  border-radius: 0;
}
</style>
