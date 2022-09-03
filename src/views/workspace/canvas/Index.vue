<template>
  <div class="fill">
    <header class="header flex">
      <ul class="stemp flex">
        <li title="重做">
          <a-icon type="left-square" theme="filled" />
        </li>
        <li title="撤回">
          <a-icon type="right-square" theme="filled" />
        </li>
      </ul>
      <ul class="option flex">
        <input type="file" accept="image/*" ref="imageInp" @change="getImage" v-show="false" />
        <li title="文字" @click="text">
          <a-icon type="form" />
        </li>
        <li title="图片" @click="image">
          <a-icon type="picture" />
        </li>
        <li title="图形">
          <a-popover placement="bottom">
            <div slot="content" class="shp-con prop-con">
              <shape-list />
            </div>
            <div class="fill">
              <a-icon type="block" />
            </div>
          </a-popover>
        </li>
        <li title="线条">
          <a-popover placement="bottom">
            <div slot="content" class="line-con prop-con">
              <line-list />
            </div>
            <div class="fill">
              <a-icon type="stock" />
            </div>
          </a-popover>
        </li>
        <li title="表格" @click="table">
          <a-popover placement="bottom">
            <div slot="content" class="line-con prop-con">
              <table-list />
            </div>
            <div class="fill">
              <a-icon type="table" />
            </div>
          </a-popover>
        </li>
        <li title="媒体">
          <a-popover placement="bottom">
            <div slot="content" class="line-con prop-con">
              <media-input />
            </div>
            <div class="fill">
              <a-icon type="video-camera" />
            </div>
          </a-popover>
        </li>
      </ul>
      <ul class="size"></ul>
    </header>
    <div class="body">
      <div
        class="canvas"
        id="canvas"
        :style="{
          width: canvasSize[0] + 'px',
          height: canvasSize[1] + 'px'
        }"
      >
        <Painter />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import CombinedVueInstance from 'vue'
import Painter from './Painter.vue'
import LineList from '@/components/repack/LineList.vue'
import ShapeList from '@/components/repack/ShapeList.vue'
import TableList from '@/components/repack/TableList.vue'
import MediaInput from '@/components/repack/MediaInput.vue'
import { Vue, Component, Ref } from 'vue-property-decorator'
@Component({
  components: { Painter, LineList, ShapeList, TableList, MediaInput }
})
export default class Canvas extends Vue {
  $bus!: CombinedVueInstance
  @Ref('imageInp') readonly imageInp!: HTMLInputElement

  get canvasSize(): number[] {
    return PPTStore.ppt.ratio.value
  }

  text(): void {
    this.$bus.$emit('call-painter-ready-insert-text')
  }

  image(): void {
    this.imageInp.click()
  }

  getImage(): void {
    const files = this.imageInp.files
    if (!files) return
    const file = files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (): void => {
      const img = new Image()
      img.src = reader.result as string
      img.onload = (): void => {
        this.$bus.$emit('call-painter-ready-insert-image', {
          w: img.width,
          h: img.height,
          url: reader.result
        })
      }
    }
  }

  table(): void {
    this.$bus.$emit('call-painter-ready-insert-table')
  }
}
</script>

<style lang="scss" scoped>
.header {
  justify-content: space-between;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #ddd;
  ul {
    height: 100%;
    list-style: none;
    box-sizing: border-box;
    li {
      width: auto;
      height: 100%;
      font-size: 22px;
      line-height: 40px;
      padding: 0 5px;
      cursor: pointer;
    }
  }
  .stemp {
    flex: 2;
    li {
      color: #ddd;
      cursor: pointer;
      &:hover {
        color: #333;
      }
    }
  }
  .option {
    justify-content: center;
    flex: 6;
    li {
      margin: 0 5px;
      &:hover {
        background: #eee;
      }
    }
  }
  .size {
    flex: 2;
  }
}
.body {
  width: 100%;
  height: calc(100% - 41px);
  display: flex;
  vertical-align: middle;
  .canvas {
    margin: auto;
    box-shadow: 0 0 15px #bbb;
  }
}
</style>
