<template>
  <div class="image-bg-con">
    <div class="type flex">
      <div class="slot">
        <slot></slot>
      </div>
      <a-select :default-value="imageType" @change="setType" class="gd-type-sel">
        <a-select-option value="cover">拉伸铺满</a-select-option>
        <a-select-option value="contain">比例缩放</a-select-option>
      </a-select>
    </div>
    <div
      @click="inputImage"
      class="uploader"
      :style="{
        background: `url(${imageUrl}) center center / ${imageType} no-repeat`
      }"
    >
      <input v-show="false" @change="getImage" type="file" accept="image/*" ref="imgInp" />
      <a-icon v-show="imageUrl === ''" :type="loadIcon" />
    </div>
  </div>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { Vue, Component, Ref } from 'vue-property-decorator'
@Component
export default class ImageBackgroundSlot extends Vue {
  @Ref('imgInp') readonly imgInp!: HTMLInputElement

  loadIcon = 'cloud-upload'

  get imageUrl(): string {
    return PPTStore.ppt.background.image.url
  }

  get imageType(): string {
    return PPTStore.ppt.background.image.type
  }

  setType(imageType: string): void {
    PPTStore.setPPTBaseInfo({
      index: PPTStore.pptIndex,
      data: { imageType }
    })
  }

  getImage(): void {
    this.loadIcon = 'loading'
    const files = this.imgInp.files
    if (!files) return
    const reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onload = () => {
      PPTStore.setPPTBaseInfo({
        index: PPTStore.pptIndex,
        data: {
          imageUrl: reader.result as string
        }
      })
    }
  }

  inputImage(): void {
    this.imgInp.click()
  }
}
</script>

<style lang="scss" scoped>
.image-bg-con {
  width: 100%;
  height: auto;
  .type {
    width: 100%;
    height: auto;
    .slot {
      flex: 1;
      margin-right: 5px;
    }
    .gd-type-sel {
      flex: 1;
      margin-left: 5px;
      border-radius: 0;
      ::v-deep(.ant-select-selection) {
        border-radius: 0;
      }
    }
  }
  .uploader {
    margin: 10px 0;
    width: 100%;
    height: 100px;
    border: 1px dashed #d9d9d9;
    line-height: 100px;
    text-align: center;
    font-size: 40px;
    color: #d9d9d9;
    cursor: pointer;
    &:hover {
      border: 1px dashed rgb(0, 145, 255);
      color: rgb(0, 145, 255);
    }
  }
}
</style>
