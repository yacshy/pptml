<template>
  <i class="absolute clip bottom" @mousedown.prevent="mouseDownHandle"></i>
</template>

<script lang="ts">
import CombinedVueInstance from 'vue'
import { PPTStore } from '@/store/ppt'
import { IImage } from '@/store/pptInterface'
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class BottomClip extends Vue {
  $bus!: CombinedVueInstance

  get active(): IImage {
    return PPTStore.active as IImage
  }

  get style(): string {
    return this.active.clip.style
  }

  get shape(): string {
    return this.active.clip.shape
  }

  // 存圆
  ellipseSize = [0, 0]
  ellipsePosi = [0, 0]

  // 存多边形
  polygon!: Array<number[]>
  max!: number
  min!: number

  // 存矩形
  rectSize = [0, 0, 0, 0]
  radius = '0%'

  result!: string

  start!: number
  offset!: number

  mouseDownHandle(e: MouseEvent): void {
    document.addEventListener('mousemove', this.mouseMoveHandle)
    document.addEventListener('mouseup', this.mouseUpHandle)
    this.start = e.screenY
    if (this.shape === 'polygon') {
      this.polygon = this.style
        .slice(8, -1)
        .split(', ')
        .map(v => v.split(' ').map(i => parseFloat(i))) as Array<
        [number, number]
      >
      this.max = Math.max(...this.polygon.map(i => i[1]))
      this.min = Math.min(...this.polygon.map(i => i[1]))
    } else if (this.shape === 'rect') {
      const style = this.style.slice(6, -1).split(' round ')
      this.rectSize = style[0].split(' ').map(i => parseFloat(i))
      this.radius = style[1]
    } else if (this.shape === 'ellipse') {
      const style = this.style.slice(8, -1).split(' at ')
      this.ellipseSize = style[0].split(' ').map(i => parseFloat(i))
      this.ellipsePosi = style[1].split(' ').map(i => parseFloat(i))
    }
  }

  mouseMoveHandle(e: MouseEvent): void {
    this.offset = (100 * (e.screenY - this.start)) / this.active.height
    if (this.shape === 'polygon') {
      const str = this.polygon
        .map(v => [
          v[0],
          v[1] + (this.offset * (v[1] - this.min)) / (this.max - this.min)
        ]) // 这里欠优化，如果超出【0，100】区域怎么办？
        .map(i => i.map(j => j + '%').join(' '))
        .join(', ')
      this.result = `polygon(${str})`
    } else if (this.shape === 'rect') {
      const [T, R, B, L] = this.rectSize
      this.result = `inset(${T}% ${R}% ${B - this.offset}% ${L}% round ${
        this.radius
      })`
    } else if (this.shape === 'ellipse') {
      const [w, h] = this.ellipseSize
      const [x, y] = this.ellipsePosi
      this.result = `ellipse(${w}% ${h + this.offset / 2}% at ${x}% ${y +
        this.offset / 2}%)`
    }
    PPTStore.setImageElementClip({
      i: PPTStore.pptIndex,
      j: PPTStore.activeIndex,
      data: {
        style: this.result
      }
    })
  }

  mouseUpHandle(): void {
    document.removeEventListener('mousemove', this.mouseMoveHandle)
    document.removeEventListener('mouseup', this.mouseUpHandle)
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  width: 30px;
  height: 8px;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
