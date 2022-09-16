<template>
  <div ref="con" :id="ele.id" class="absolute con" :style="{
    zIndex: ele.zIndex,
    opacity: ele.opacity,
    top: ele.top + 'px',
    left: ele.left + 'px',
    width: ele.width + 'px',
    height: ele.height + 'px',
    transform: `rotateZ(${ele.angle}deg)`
  }">
    <svg @click="activeMe" class="line" :width="ele.width" :height="ele.height" @mousedown.prevent="down($event)">
      <line-marker :ele="ele" />
      <!-- 曲线的刻度线 -->
      <g v-if="ele.line.isCurve" v-show="active">
        <path ref="curvepath" :d="curvePath" class="curve-line" />
      </g>
      <!-- 线条 -->
      <g :style="{
        filter: shadow.open ? `drop-shadow(${shadow.color} ${shadow.x}px ${shadow.y}px ${shadow.w}px)` : 'none'
      }">
        <path ref="path" vector-effect="non-scaling-stroke" :style="{
          stroke: ele.stroke,
          strokeWidth: ele.height,
          ...marker
        }" />
      </g>
    </svg>
    <!-- 线条起点 -->
    <i v-show="active" @mousedown.prevent="headDown($event)" ref="headicon" class="absolute coat line-coat" :style="{
      top: ele.height / 2 + 'px',
      left: '0px'
    }"></i>
    <!-- 只有曲线才有的 -->
    <i v-if="ele.line.isCurve || ele.line.isBroken" v-show="active" @mousedown.prevent="curveDown($event)"
      ref="curveicon" class="absolute coat line-coat" :style="{
        ...curveIconStyle
      }"></i>
    <!-- 线条终点 -->
    <i v-show="active" @mousedown.prevent="footDown($event)" ref="footicon" class="absolute coat line-coat" :style="{
      top: ele.height / 2 + 'px',
      right: '-12px'
    }"></i>
  </div>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { ILine, IShape } from '@/store/pptInterface'
import {
  calcQuadrant,
  calcAngle,
  calcDistanceFromPointToLine
} from '@/utils/calcQuadrant'
import { afterFindElement } from '@/utils/FormatParma'
import MoveCoat from '@/components/coat/Move.vue'
import SwitchCoat from '@/components/coat/Switch.vue'
import LineMarker from '@/components/repack/LineMarker.vue'
import { Component, Prop, Ref, Mixins } from 'vue-property-decorator'
@Component({
  components: { LineMarker }
})
export default class InsertLine extends Mixins(SwitchCoat, MoveCoat) {
  @Prop() declare ele: ILine
  @Ref('con') declare con: HTMLElement
  @Ref('path') readonly path!: HTMLElement
  @Ref('headicon') readonly headicon!: HTMLElement
  @Ref('footicon') readonly footicon!: HTMLElement
  @Ref('curveicon') readonly curveicon!: HTMLElement
  @Ref('curvepath') readonly curvepath!: HTMLElement

  get curvePath(): string {
    const pathY = this.ele.height / 2
    const start = this.ele.startPosition
    const waist = this.ele.waistPosition
    const end = this.ele.endPosition

    const quadrant = calcQuadrant(start[0], start[1], end[0], end[1])
    let top = calcDistanceFromPointToLine(waist, start, end)
    top = quadrant === 2 || quadrant === 3 ? -1 * top : top

    const left = Math.sqrt(
      (waist[0] - start[0]) ** 2 + (waist[1] - start[1]) ** 2 - top ** 2
    )
    return `M 0 ${pathY} L ${left} ${top} L ${this.ele.width} ${pathY}`
  }

  refreshPath(): void {
    const pathY = this.ele.height / 2
    if (!(this.ele.line.isCurve || this.ele.line.isBroken)) {
      this.path.setAttribute('d', `M 0 ${pathY} L ${this.ele.width} ${pathY}`)
      return
    }
    const start = this.ele.startPosition
    const waist = this.ele.waistPosition
    const end = this.ele.endPosition

    const quadrant = calcQuadrant(start[0], start[1], end[0], end[1])
    let top = calcDistanceFromPointToLine(waist, start, end)
    top = quadrant === 2 || quadrant === 3 ? -1 * top : top

    const left = Math.sqrt(
      (waist[0] - start[0]) ** 2 + (waist[1] - start[1]) ** 2 - top ** 2
    )
    if (this.ele.line.isCurve) {
      this.path.setAttribute(
        'd',
        `M0,${pathY} Q${left},${top} ${this.ele.width},${pathY}`
      )
      return
    }
    this.path.setAttribute(
      'd',
      `M 0 ${pathY} L ${left} ${top} L ${this.ele.width} ${pathY}`
    )
  }

  get curveIconStyle(): Record<string, string> {
    const start = this.ele.startPosition
    const waist = this.ele.waistPosition
    const end = this.ele.endPosition

    const quadrant = calcQuadrant(start[0], start[1], end[0], end[1])
    let top = calcDistanceFromPointToLine(waist, start, end)
    top = quadrant === 2 || quadrant === 3 ? -1 * top : top

    const left = Math.sqrt(
      (waist[0] - start[0]) ** 2 + (waist[1] - start[1]) ** 2 - top ** 2
    )

    return { top: top + 'px', left: left + 'px' }
  }

  mounted(): void {
    this.refreshPath()
  }

  get marker(): Record<string, string> {
    const { line } = this.ele
    const strokeDasharray = line.style === 'dashed' ? '4, 1' : 'none'
    const [s, e] = line.points
    const markerStart = s
      ? s === 'dot'
        ? `url(#${this.ele.id}-dot-start)`
        : `url(#${this.ele.id}-arrow-start)`
      : 'none'
    const markerEnd = e
      ? e === 'dot'
        ? `url(#${this.ele.id}-dot-end)`
        : `url(#${this.ele.id}-arrow-end)`
      : 'none'
    return { strokeDasharray, markerStart, markerEnd }
  }

  get shadow(): IShape['shadow'] {
    return this.ele.shadow
  }

  start = [0, 0]

  /************************************
   * 头部
   */
  headDown(e: MouseEvent): void {
    document.addEventListener('mousemove', this.headMove)
    document.addEventListener('mouseup', this.headUp)
    this.start = [e.screenX, e.screenY]
  }

  headMove(e: MouseEvent): void {
    const [osx, osy] = this.ele.startPosition
    const [oex, oey] = this.ele.endPosition

    const [ofx, ofy] = [e.screenX - this.start[0], e.screenY - this.start[1]]
    const [sx, sy] = [osx + ofx, osy + ofy]

    const width = Math.sqrt((sx - oex) ** 2 + (sy - oey) ** 2)
    const angle = calcAngle(sx, sy, oex, oey)
    const startPosition = [sx, sy]
    const top = sy
    const left = sx

    const waistPosition = [(oex + sx) / 2, (oey + sy) / 2]

    PPTStore.setLineElementSizeAndPosition(
      afterFindElement({
        top,
        left,
        angle,
        width,
        startPosition,
        waistPosition
      })
    )
    this.start = [e.screenX, e.screenY]
    this.refreshPath()
  }

  headUp(): void {
    document.removeEventListener('mousemove', this.headMove)
    document.removeEventListener('mouseup', this.headUp)
  }

  /************************************
   * 腰部
   */

  curveDown(e: MouseEvent): void {
    document.addEventListener('mousemove', this.curveMove)
    document.addEventListener('mouseup', this.curveUp)
    this.start = [e.screenX, e.screenY]
  }

  curveMove(e: MouseEvent): void {
    const [owPx, owPy] = this.ele.waistPosition

    const [ofx, ofy] = [e.screenX - this.start[0], e.screenY - this.start[1]]
    const [wPx, wPy] = [owPx + ofx, owPy + ofy]

    PPTStore.setLineElementSizeAndPosition(
      afterFindElement({ waistPosition: [wPx, wPy] })
    )
    this.start = [e.screenX, e.screenY]
    this.refreshPath()
  }

  curveUp(): void {
    document.removeEventListener('mousemove', this.curveMove)
    document.removeEventListener('mouseup', this.curveUp)
  }

  /************************************
   * 尾部
   */
  footDown(e: MouseEvent): void {
    document.addEventListener('mousemove', this.footMove)
    document.addEventListener('mouseup', this.footUp)
    this.start = [e.screenX, e.screenY]
  }

  footMove(e: MouseEvent): void {
    const [osx, osy] = this.ele.startPosition
    const [oex, oey] = this.ele.endPosition

    const [ofx, ofy] = [e.screenX - this.start[0], e.screenY - this.start[1]]
    const [ex, ey] = [oex + ofx, oey + ofy]

    const width = Math.sqrt((ex - osx) ** 2 + (ey - osy) ** 2)
    const angle = calcAngle(osx, osy, ex, ey)
    const endPosition = [ex, ey]

    const waistPosition = [(osx + ex) / 2, (osy + ey) / 2]

    PPTStore.setLineElementSizeAndPosition(
      afterFindElement({
        angle,
        width,
        endPosition,
        waistPosition
      })
    )
    this.start = [e.screenX, e.screenY]
    this.refreshPath()
  }

  footUp(): void {
    document.removeEventListener('mousemove', this.footMove)
    document.removeEventListener('mouseup', this.footUp)
  }
}
</script>

<style lang="scss" scoped>
.con {
  transform-origin: 0;

  .line {
    fill: transparent;
    overflow: visible;
    // 我不知道为什么画出来的线会和画的轨迹有偏移，此处不得已做-15px（此数字由目测得出）的误差纠正，具体原因日后细查 2022-08-19
    transform: translateY(-15px);

    path {
      cursor: move;
    }

    .curve-line {
      stroke: rgb(0, 145, 255);
      stroke-width: 1;
      stroke-dasharray: 4, 1;
      fill: transparent;
    }
  }

  .line-coat {
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>
