<template>
  <div ref="con" :id="ele.id" class="absolute" :style="{
    zIndex: ele.zIndex,
    opacity: ele.opacity,
    top: ele.top + 'px',
    left: ele.left + 'px',
    width: ele.width + 'px',
    height: ele.height + 'px',
    transform: `rotateZ(${ele.angle}deg)`,
    filter
  }">
    <img v-show="clip" :src="ele.url" class="fill absolute mask" />
    <div class="absolute" :style="{
      top: clipCoat.top + '%',
      left: clipCoat.left + '%',
      width: clipCoat.width + '%',
      height: clipCoat.height + '%',
      border: active ? '1px dashed rgb(0, 145, 255)' : '1px dashed rgba(0,0,0,0)',
    }">
      <!-- clipping -->
      <top-clip v-show="clip" />
      <left-clip v-show="clip" />
      <right-clip v-show="clip" />
      <bottom-clip v-show="clip" />
      <!-- coat -->
      <top-coat v-show="active && !clip" />
      <left-coat v-show="active && !clip" />
      <right-coat v-show="active && !clip" />
      <rotate-coat v-show="active && !clip" />
      <bottom-coat v-show="active && !clip" />
    </div>
    <img :src="ele.url" @click="activeMe" @mousedown.prevent="down($event)" class="ele-con absolute fill" :style="{
      clipPath: ele.clip.style
    }" />
  </div>
</template>

<script lang="ts">
import CombinedVueInstance from 'vue'
import { IImage } from '@/store/pptInterface'
import TopCoat from '@/components/coat/Top.vue'
import MoveCoat from '@/components/coat/Move.vue'
import LeftCoat from '@/components/coat/Left.vue'
import RightCoat from '@/components/coat/Right.vue'
import RotateCoat from '@/components/coat/Rotate.vue'
import BottomCoat from '@/components/coat/Bottom.vue'
import SwitchCoat from '@/components/coat/Switch.vue'
import TopClip from '@/components/clip/Top.vue'
import LeftClip from '@/components/clip/Left.vue'
import RightClip from '@/components/clip/Right.vue'
import BottomClip from '@/components/clip/Bottom.vue'
import { Component, Prop, Ref, Mixins, Watch } from 'vue-property-decorator'

interface IClipCoat {
  top: number
  left: number
  width: number
  height: number
}

@Component({
  components: {
    TopCoat,
    LeftCoat,
    RightCoat,
    RotateCoat,
    BottomCoat,
    TopClip,
    LeftClip,
    RightClip,
    BottomClip
  }
})
export default class InsertImage extends Mixins(MoveCoat, SwitchCoat) {
  $bus!: CombinedVueInstance
  @Prop() declare ele: IImage
  @Ref('con') declare con: HTMLElement

  declare active: boolean

  get filter(): string {
    const shadow = this.ele.shadow
    const _shadow = shadow.open
      ? `drop-shadow(${shadow.color} ${shadow.x}px ${shadow.y}px ${shadow.w}px)`
      : ''
    if (!this.ele.filter.open) return _shadow
    const {
      blur,
      brightness,
      contrast,
      grayscale,
      saturate,
      hueRotate
    } = this.ele.filter
    return `${_shadow} blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) saturate(${saturate}%) hue-rotate(${hueRotate}deg)`
  }

  get clipCoat(): IClipCoat {
    const style = this.ele.clip.style
    const shape = this.ele.clip.shape
    let top!: number, left!: number, width!: number, height!: number
    if (shape === 'rect') {
      const [T, R, B, L] = style
        .slice(6, -1)
        .split(' round ')[0]
        .split(' ')
        .map(i => parseFloat(i))
      top = T
      left = L
      width = 100 - L - R
      height = 100 - T - B
    } else if (shape === 'polygon') {
      const xarr: number[] = []
      const yarr: number[] = []
      style
        .slice(8, -1)
        .split(', ')
        .map(i => i.split(' '))
        .forEach(v => {
          xarr.push(parseFloat(v[0]))
          yarr.push(parseFloat(v[1]))
        })
      top = Math.min(...yarr)
      left = Math.min(...xarr)
      width = Math.max(...xarr) - left
      height = Math.max(...yarr) - top
    } else if (shape === 'ellipse') {
      const [rx, ry, x, y] = style
        .slice(8, -1)
        .replace(' at ', ' ')
        .split(' ')
        .map(i => parseFloat(i))
      top = y - ry
      left = x - rx
      width = 2 * rx
      height = 2 * ry
    }
    return { top, left, width, height }
  }

  clipId = ''
  get clip(): boolean {
    return this.ele.id === this.clipId
  }

  created(): void {
    this.$bus.$on(
      'call-insertImageVue-ready-to-clipping-image',
      this.readyToClipping
    )
  }

  beforeDestroy(): void {
    this.$bus.$off('call-insertImageVue-ready-to-clipping-image')
  }

  readyToClipping(id: string): void {
    this.clipId = id
  }

  @Watch('active')
  activeHandle(act: boolean): void {
    if (act === false) this.clipId = ''
  }
}
</script>

<style lang="scss" scoped>
.ele-con {
  cursor: move;
}

.mask {
  filter: brightness(60%);
}
</style>
