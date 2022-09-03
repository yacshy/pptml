<template>
  <div ref="screen" class="relative fill">
    <div
      v-for="(ppt, i) in list"
      v-show="index === i"
      class="absolute page"
      :id="ppt.id"
      ref="page"
      :style="{
        width: ppt.ratio.value[0] + 'px',
        height: ppt.ratio.value[1] + 'px',
        background: background(ppt.background),
        transform: transform(ppt.ratio.value),
      }"
      :key="ppt.id"
    >
      <display-text v-for="ele in eleFilter(ppt, 'text')" :ele="ele" :key="ele.id + '_display'" />
      <display-shape v-for="ele in eleFilter(ppt, 'shape')" :ele="ele" :key="ele.id + '_display'" />
      <display-line v-for="ele in eleFilter(ppt, 'line')" :ele="ele" :key="ele.id + '_display'" />
      <display-image v-for="ele in eleFilter(ppt, 'image')" :ele="ele" :key="ele.id + '_display'" />
      <display-table v-for="ele in eleFilter(ppt, 'table')" :ele="ele" :key="ele.id + '_display'" />
      <display-audio v-for="ele in eleFilter(ppt, 'audio')" :ele="ele" :key="ele.id + '_display'" />
      <display-video v-for="ele in eleFilter(ppt, 'video')" :ele="ele" :key="ele.id + '_display'" />
    </div>
  </div>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { IPPT, IEleType, IAnimation } from '@/store/pptInterface'
import DisplayText from '@/components/display/Text.vue'
import DisplayShape from '@/components/display/Shape.vue'
import DisplayLine from '@/components/display/Line.vue'
import DisplayImage from '@/components/display/Image.vue'
import DisplayTable from '@/components/display/Table.vue'
import DisplayAudio from '@/components/display/Audio.vue'
import DisplayVideo from '@/components/display/Video.vue'
import { Vue, Component, Ref } from 'vue-property-decorator'

@Component({
  components: {
    DisplayText,
    DisplayShape,
    DisplayLine,
    DisplayImage,
    DisplayTable,
    DisplayAudio,
    DisplayVideo
  }
})
export default class Display extends Vue {
  @Ref('page') readonly page!: HTMLElement
  @Ref('screen') readonly screen!: HTMLElement
  mounted(): void {
    window.addEventListener('wheel', this.throttleForMouseWheel)
    this.hideEleOwnAnimation()
    this.addAnimation(0)
  }

  beforeDestory(): void {
    window.removeEventListener('wheel', this.throttleForMouseWheel)
  }

  index = 0
  aniIndex = 0
  animateRegExp = / animate__([a-zA-Z].+)/g

  get list(): IPPT[] {
    return PPTStore.list
  }

  get ppt(): IPPT {
    return this.list[this.index]
  }

  get animation(): IAnimation[][] {
    return this.list[this.index].animation
  }

  background(bg: IPPT['background']): string {
    if (bg.type === 'solid') return bg.solid
    if (bg.type === 'image') {
      return `url(${bg.image.url}) center center / ${bg.image.type} no-repeat`
    }
    const { start, end } = bg.gradient
    return bg.gradient.type === 'linear'
      ? `linear-gradient(to right top ,${start}, ${end})`
      : `radial-gradient(circle farthest-corner at center, ${start}, ${end})`
  }

  transform(ratio: number[]): string {
    const [w, h] = ratio
    if (this.screen) {
      const cliWidth = this.screen.offsetWidth
      const cliHeight = this.screen.offsetHeight
      const minRatio = Math.min(cliWidth / w, cliHeight / h)
      return `scale(${minRatio})`
    }
    return 'scale(1)'
  }

  eleFilter(ppt: IPPT, type: string): Array<IEleType['all']> {
    return ppt.content.filter(i => i.type === type)
  }

  hideEleOwnAnimation(): void {
    this.list.forEach(ppt => {
      ppt.animation
        .slice(1)
        .flat()
        .forEach(ani => {
          const ele = this.screen.querySelector(
            `#${ani.activeId}`
          ) as HTMLElement
          ele.style.display = 'none'
        })
    })
  }

  addAnimation(index: number): void {
    this.animation[index].forEach(ani => {
      const ele = this.screen.querySelector(`#${ani.activeId}`) as HTMLElement
      ele.style.display = 'block'
      ele.className += ` animate__animated animate__${ani.value}`
      setTimeout(() => {
        ele.className = ele.className.replaceAll(this.animateRegExp, '')
      }, 1000)
    })
  }

  removeAnimation(index: number): void {
    this.animation[index].forEach(ani => {
      const ele = this.screen.querySelector(`#${ani.activeId}`) as HTMLElement
      ele.className = ele.className.replaceAll(this.animateRegExp, '')
      ele.style.display = 'none'
    })
  }

  timer = true
  throttleForMouseWheel(e: WheelEvent): void {
    if (this.timer) {
      setTimeout(() => {
        this.mouseWheelHandle(e)
        this.timer = true
      }, 500)
      this.timer = false
    }
  }

  mouseWheelHandle(e: WheelEvent): void {
    if (e.deltaY > 0) {
      // 下滑
      if (this.aniIndex < this.animation.length - 1) {
        const oldaniIndex = this.aniIndex
        this.aniIndex++
        if (this.aniIndex > 0 && this.aniIndex !== oldaniIndex) {
          this.addAnimation(this.aniIndex)
        }
      } else if (this.index < this.list.length - 1) {
        this.aniIndex = 0
        this.index++
        this.addAnimation(0)
      }
    } else if (e.deltaY < 0) {
      // 上滑
      if (this.aniIndex > 0) {
        this.removeAnimation(this.aniIndex)
        this.aniIndex--
      } else if (this.index > 0) {
        this.removeAnimation(0)
        this.index--
        this.aniIndex = this.animation.length - 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  overflow: hidden;
}
.none {
  display: none;
}
</style>
