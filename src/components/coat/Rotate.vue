<template>
  <i coat class="absolute coat rotate" @mousedown.prevent="down"></i>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { IPPTBase } from '@/store/pptInterface'
import { afterFindElement } from '@/utils/FormatParma'
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class RotateCoat extends Vue {
  aim!: HTMLElement
  angle!: number
  startPosition = [0, 0]

  mounted(): void {
    this.aim = document.getElementById(PPTStore.activeId) as HTMLElement
  }

  down(e: MouseEvent): void {
    if (!this.aim) {
      this.aim = document.getElementById(PPTStore.activeId) as HTMLElement
    }
    document.addEventListener('mousemove', this.move)
    document.addEventListener('mouseup', this.up)
    this.angle = (PPTStore.active as IPPTBase).angle
    this.startPosition = [e.screenX, e.screenY]
  }

  move(e: MouseEvent): void {
    const [sx, sy] = this.startPosition
    const [ofx, ofy] = [e.screenX - sx, e.screenY - sy]
    this.angle +=
      ofx * Math.cos((Math.PI * this.angle) / 180) +
      ofy * Math.sin((Math.PI * this.angle) / 180)
    this.aim.style.transform = `rotateZ(${this.angle}deg)`
    this.startPosition = [e.screenX, e.screenY]
  }

  up(): void {
    document.removeEventListener('mousemove', this.move)
    document.removeEventListener('mouseup', this.up)
    PPTStore.setElementBaseInfo(afterFindElement({ angle: this.angle }))
  }
}
</script>

<style lang="scss" scoped>
.rotate {
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
