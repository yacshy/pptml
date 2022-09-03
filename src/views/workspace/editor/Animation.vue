<template>
  <div class="fill container">
    <div v-show="isPPt" class="con">
      <p>选中画布中的元素添加动画</p>
      <a-divider />
    </div>

    <div v-show="!isPPt" class="is-element con">
      <a-popover placement="bottomLeft" trigger="click">
        <template slot="content">
          <a-tabs default-active-key="1" class="animation-list">
            <a-tab-pane key="1" tab="入场">
              <animation-list :list="intoAnimations" type="into" />
            </a-tab-pane>
            <a-tab-pane key="2" tab="退场">
              <animation-list :list="exitAnimations" type="exit" />
            </a-tab-pane>
            <a-tab-pane key="3" tab="强调">
              <animation-list :list="stressAnimations" type="stress" />
            </a-tab-pane>
          </a-tabs>
        </template>
        <a-button class="btn">
          <a-icon type="thunderbolt" />添加动画
        </a-button>
      </a-popover>
    </div>

    <div class="con" style="margin-top: 10px;">
      <div v-for="(anis, i) in animations" :key="`animation_${i}`">
        <div v-for="(ani, j) in anis" class="ani-con" :key="`animation_${i}_${j}`">
          <div class="flex" style="justify-content: space-around;">
            <div class="index">{{j === 0 ? i : ''}}</div>
            <div class="text">【{{ani.type}}】{{ani.name}}</div>
            <div class="icon">
              <a-icon type="caret-right" class="hover" @click="playAnimation(ani)" />
              <a-icon type="close" class="hover" @click="deleteAnimation(i, j)" />
            </div>
          </div>
          <div v-show="ele.id === ani.activeId" class="is-me flex">
            <label>触发方式:</label>
            <a-select
              :default-value="lunchAnitionType(i, j)"
              @change="changeLunchAnimationType(i, j, $event)"
              class="select"
            >
              <a-select-option value="0">主动触发</a-select-option>
              <a-select-option value="1" :disabled="i <= 1">与上次同时</a-select-option>
              <a-select-option value="2">在上次之后</a-select-option>
            </a-select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CombinedVueInstance from 'vue'
import { PPTStore } from '@/store/ppt'
import {
  INTO_ANIMATIONS,
  EXIT_ANIMATIONS,
  STRESS_ANIMATIONS,
  ITypeAnimation
} from '@/configs/animation'
import AnimationList from '@/components/repack/AnimationList.vue'
import { IEleType, IAnimation } from '@/store/pptInterface'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: { AnimationList }
})
export default class Animation extends Vue {
  $bus!: CombinedVueInstance

  get intoAnimations(): Array<ITypeAnimation> {
    return INTO_ANIMATIONS
  }

  get exitAnimations(): Array<ITypeAnimation> {
    return EXIT_ANIMATIONS
  }

  get stressAnimations(): Array<ITypeAnimation> {
    return STRESS_ANIMATIONS
  }

  get animations(): Array<IAnimation[]> {
    return PPTStore.ppt.animation
  }

  get ele(): IEleType['base'] {
    return PPTStore.active as IEleType['base']
  }

  get isPPt(): boolean {
    return PPTStore.active.type === 'ppt'
  }

  created(): void {
    this.$bus.$on('call-animationvue-display-animation', this.playAnimation)
  }

  beforeDestroy(): void {
    this.$bus.$off('call-animationvue-display-animation')
  }

  lunchAnitionType(i: number, j: number): string {
    if (i === 0) return '0'
    if (j === 0) return '2'
    return '1'
  }

  playAnimation(ani: IAnimation): void {
    const ele = document.getElementById(ani.activeId) as HTMLElement
    ele.className = ele.className.replaceAll(/ animate__([a-zA-Z].+)/g, '')
    ele.className += ` animate__animated animate__${ani.value}`
    setTimeout(() => {
      ele.className = ele.className.replaceAll(/ animate__([a-zA-Z].+)/g, '')
    }, 1000)
  }

  deleteAnimation(i: number, j: number): void {
    PPTStore.deletAnimation({ index: PPTStore.pptIndex, data: { i, j } })
  }

  changeLunchAnimationType(i: number, j: number, type: string): void {
    PPTStore.changeAnimationOrder({
      index: PPTStore.pptIndex,
      data: { i, j, type }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/scroll.scss';
@import '@/scss/selectRadius.scss';
.con {
  width: 100%;
  padding: 0 10px;
  text-align: center;
  box-sizing: border-box;
}
.ani-con {
  line-height: 30px;
  width: 100%;
  min-height: 30px;
  height: auto;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  .index {
    flex: 1;
    padding-left: 5px;
    box-sizing: border-box;
    text-align: left;
  }
  .text {
    flex: 7;
    text-align: left;
  }
  .icon {
    display: flex;
    justify-content: space-around;
    flex: 2;
    font-size: 16px;
    .hover {
      padding: 7px 0;
      cursor: pointer;
    }
  }
  .is-me {
    border-top: 1px solid #eee;
    padding: 10px 5px;
    box-sizing: border-box;
    label {
      flex: 3;
      text-align: left;
    }
    .select {
      flex: 6;
      width: 100px;
      @include radius;
    }
  }
}
.is-element {
  .btn {
    width: 100%;
    height: 30px;
    line-height: 30px;
    border-radius: 0;
  }
}
.animation-list {
  width: 500px;
  height: auto;
  max-height: 600px;
  overflow: scroll;
  @include scroll;
}
</style>
