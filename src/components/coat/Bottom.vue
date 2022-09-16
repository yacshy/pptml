<template>
  <i coat class="absolute coat bottom" ref="icon" @mousedown.prevent="down"></i>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { IEleType } from '@/store/pptInterface'
import { Vue, Component, Ref } from 'vue-property-decorator'
@Component
export default class BottomCoat extends Vue {
  @Ref('icon') readonly icon!: HTMLElement
  aim!: HTMLElement
  svgG!: SVGGElement
  get active(): IEleType['base'] {
    return PPTStore.active as IEleType['base']
  }

  mounted(): void {
    this.aim = document.getElementById(this.active.id) as HTMLElement
    if (this.active.type === 'shape') {
      this.svgG = this.aim.querySelector('g') as SVGGElement
    }
  }

  start = [0, 0]
  offset = 0
  down(e: MouseEvent): void {
    if (!this.aim) {
      this.aim = document.getElementById(this.active.id) as HTMLElement
      if (this.active.type === 'shape') {
        this.svgG = this.aim.querySelector('g') as SVGGElement
      }
    }
    document.addEventListener('mousemove', this.move)
    document.addEventListener('mouseup', this.up)
    this.start = [e.screenX, e.screenY]
  }

  move(e: MouseEvent): void {
    const [ofx, ofy] = [e.screenX - this.start[0], e.screenY - this.start[1]]

    const angle = (Math.PI * this.active.angle) / 180
    this.offset = Math.cos(angle) * ofy - Math.sin(angle) * ofx

    const style = this.aim.style
    const { width, height } = this.active

    style.height = `${height + this.offset}px`

    if (this.active.type === 'shape') {
      this.svgG.setAttribute(
        'transform',
        `scale(${width / 200}, ${(height + this.offset) /
          200}) translate(0,0) matrix(1,0,0,1,0,0)`
      )
    }
  }

  up(): void {
    document.removeEventListener('mousemove', this.move)
    document.removeEventListener('mouseup', this.up)
    PPTStore.setElementBaseInfo({
      i: PPTStore.pptIndex,
      j: PPTStore.activeIndex,
      data: {
        height: this.active.height + this.offset
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  left: 50%;
  bottom: -6px;
  transform: translateX(-50%);
}
</style>
