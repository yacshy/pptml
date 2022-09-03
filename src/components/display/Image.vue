<template>
  <img
    :id="ele.id"
    :src="ele.url"
    class="ele-con absolute"
    :style="{
      zIndex: ele.zIndex,
      opacity: ele.opacity,
      top: ele.top + 'px',
      left: ele.left + 'px',
      width: ele.width + 'px',
      height: ele.height + 'px',
      transform: `rotateZ(${ele.angle}deg)`,
      filter,
      clipPath: ele.clip.style
    }"
  />
</template>

<script lang="ts">
import { IImage } from '@/store/pptInterface'
import { Component, Prop, Vue } from 'vue-property-decorator'

interface IClipCoat {
  top: number
  left: number
  width: number
  height: number
}

@Component
export default class DisplayImage extends Vue {
  @Prop() readonly ele!: IImage

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
