<template>
  <div class="fill">
    <row-with-title-slot title="颜色">
      <color-picker :value="ele.fill" :change="setFillColor" />
    </row-with-title-slot>
    <a-divider />
    <edit-border :ele="ele" />
    <edit-shadow :ele="ele" />
    <edit-opacity :ele="ele" />
  </div>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { IShape } from '@/store/pptInterface'
import { afterFindElement } from '@/utils/FormatParma'
import EditShadow from '@/components/style/Shadow.vue'
import EditOpacity from '@/components/style/Opacity.vue'
import EditBorder from '@/components/style/Border.vue'
import ColorPicker from '@/components/repack/ColorPicker.vue'
import RowWithTitleSlot from '@/components/repack/RowWithTitleSlot.vue'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {
    EditShadow,
    EditOpacity,
    RowWithTitleSlot,
    ColorPicker,
    EditBorder
  }
})
export default class EditShapeStyle extends Vue {
  get ele(): IShape {
    return PPTStore.active as IShape
  }

  setFillColor(data: string): void {
    PPTStore.setShapeFill(afterFindElement(data))
  }
}
</script>

<style lang="scss" scoped>
</style>
