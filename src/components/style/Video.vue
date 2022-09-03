<template>
  <div class="fill">
    <p class="title">选择封面</p>
    <div
      class="cover"
      @click="inpCover"
      :style="{
        background: `url(${ele.cover}) center center / contain no-repeat`
      }"
    >
      <a-icon type="cloud-upload" />
      <input v-show="false" ref="inp" @change="getImage" type="file" accept="image/*" />
    </div>
  </div>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { IVideo } from '@/store/pptInterface'
import { afterFindElement } from '@/utils/FormatParma'
import ColorPicker from '@/components/repack/ColorPicker.vue'
import RowWithTitleSlot from '@/components/repack/RowWithTitleSlot.vue'
import { Vue, Component, Ref } from 'vue-property-decorator'
@Component({
  components: { RowWithTitleSlot, ColorPicker }
})
export default class EditVideoStyle extends Vue {
  @Ref('inp') readonly inp!: HTMLInputElement
  get ele(): IVideo {
    return PPTStore.active as IVideo
  }

  inpCover(): void {
    this.inp.click()
  }

  getImage(): void {
    const files = this.inp.files
    if (!files) return
    const file = files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (): void => {
      PPTStore.setVideoElementInfo(afterFindElement(reader.result as string))
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  padding: 0 5px;
  font-size: 15px;
  font-weight: 600;
}
.cover {
  width: 100%;
  height: 100px;
  border: 1px dashed #d9d9d9;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
  cursor: pointer;
  &:hover {
    color: #0091ff;
  }
}
</style>
