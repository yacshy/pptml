<template>
  <div class="fill">
    <row-with-title-slot title="图标颜色">
      <color-picker :value="ele.background" :change="setColor" />
    </row-with-title-slot>
    <row-with-title-slot title="图标尺寸">
      <a-input-number
        :min="20"
        :max="100"
        :default-value="ele.size"
        @change="setSize"
        class="num-inp"
      />
    </row-with-title-slot>
    <div class="row">
      <label>自动播放：</label>
      <a-switch :default-checked="ele.loop" @change="onChange" class="radio" />
    </div>
  </div>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { IAudio } from '@/store/pptInterface'
import { afterFindElement } from '@/utils/FormatParma'
import ColorPicker from '@/components/repack/ColorPicker.vue'
import RowWithTitleSlot from '@/components/repack/RowWithTitleSlot.vue'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: { RowWithTitleSlot, ColorPicker }
})
export default class EditAudioStyle extends Vue {
  get ele(): IAudio {
    return PPTStore.active as IAudio
  }

  setColor(background: string): void {
    PPTStore.setAudioBaseInfo(afterFindElement({ background }))
  }

  onChange(loop: boolean): void {
    PPTStore.setAudioBaseInfo(afterFindElement({ loop }))
  }

  setSize(size: number): void {
    PPTStore.setAudioBaseInfo(afterFindElement({ size }))
  }
}
</script>

<style lang="scss" scoped>
.row {
  width: 100%;
  height: 32px;
  display: flex;
  label {
    flex: 4;
  }
  .radio {
    flex: 7;
  }
}
.num-inp {
  width: 100%;
  border-radius: 0;
}
</style>
