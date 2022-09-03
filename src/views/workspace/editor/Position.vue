<template>
  <div class="fill">
    <p class="title">层级：</p>
    <div class="row">
      <a-radio-group class="radio-gup">
        <a-radio-button class="radio-opt" value="top" @click="putOnTop">
          <a-icon type="vertical-align-top" />置于顶层
        </a-radio-button>
        <a-radio-button class="radio-opt" value="bottom" @click="putOnBottom">
          <a-icon type="vertical-align-bottom" />置于底层
        </a-radio-button>
      </a-radio-group>
    </div>
    <div class="row">
      <a-radio-group class="radio-gup">
        <a-radio-button class="radio-opt" value="upper" @click="sendForeword">
          <a-icon type="arrow-up" />上移一层
        </a-radio-button>
        <a-radio-button class="radio-opt" value="lower" @click="sendBackword">
          <a-icon type="arrow-down" />下移一层
        </a-radio-button>
      </a-radio-group>
    </div>

    <p class="title">位置：</p>
    <row-with-title-slot title="left">
      <a-input-number class="inp radius" v-model="ele.left" />
    </row-with-title-slot>
    <row-with-title-slot title="top">
      <a-input-number class="inp radius" v-model="ele.top" />
    </row-with-title-slot>
    <p v-show="!isAudio" class="title">大小：</p>
    <row-with-title-slot title="宽度">
      <a-input-number class="inp radius" v-model="ele.width" />
    </row-with-title-slot>
    <row-with-title-slot title="高度">
      <a-input-number :disabled="disabled" class="inp radius" v-model="ele.height" />
    </row-with-title-slot>
    <row-with-title-slot title="旋转">
      <a-input-number class="inp radius" v-model="ele.angle" @change="changeAngle" />
    </row-with-title-slot>
  </div>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { IEleType } from '@/store/pptInterface'
import { afterFindElement } from '@/utils/FormatParma'
import RowWithTitleSlot from '@/components/repack/RowWithTitleSlot.vue'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: { RowWithTitleSlot }
})
export default class Position extends Vue {
  get ele(): IEleType['base'] {
    return PPTStore.active as IEleType['base']
  }

  get isMedia(): boolean {
    return ['video', 'audio'].includes(PPTStore.active.type)
  }

  get isAudio(): boolean {
    return PPTStore.active.type === 'audio'
  }

  get disabled(): boolean {
    return ['text', 'table'].includes(this.ele.type)
  }

  putOnTop(): void {
    PPTStore.setElementBaseInfo(
      afterFindElement({
        zIndex: PPTStore.ppt.content.length + 1
      })
    )
  }

  putOnBottom(): void {
    PPTStore.setElementBaseInfo(afterFindElement({ zIndex: 1 }))
  }

  sendForeword(): void {
    PPTStore.setElementBaseInfo(
      afterFindElement({ zIndex: this.ele.zIndex + 1 })
    )
  }

  sendBackword(): void {
    PPTStore.setElementBaseInfo(
      afterFindElement({ zIndex: this.ele.zIndex - 1 })
    )
  }

  changeAngle(angle: number): void {
    PPTStore.setElementBaseInfo(afterFindElement({ angle }))
  }
}
</script>

<style lang="scss" scoped>
.title {
  padding: 0 5px;
  font-size: 15px;
  font-weight: 600;
}
.row {
  margin-bottom: 10px;
  padding: 0 10px;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  .radio-gup {
    width: 100%;
    .radio-opt {
      width: 50%;
      border-radius: 0;
    }
  }
  .inp {
    width: 100%;
  }
  .radius {
    border-radius: 0;
  }
}
</style>
