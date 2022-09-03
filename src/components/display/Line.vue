<template>
  <div
    :id="ele.id"
    class="absolute con"
    :style="{
      zIndex: ele.zIndex,
      opacity: ele.opacity,
      top: ele.top + 'px',
      left: ele.left + 'px',
      width: ele.width + 'px',
      height: ele.height + 'px',
      transform: `rotateZ(${ele.angle}deg)`
    }"
  >
    <svg class="line" :width="ele.width" :height="ele.height">
      <line-marker :ele="ele" />
      <!-- 线条 -->
      <g
        :style="{
          filter: shadow.open ? `drop-shadow(${shadow.color} ${shadow.x}px ${shadow.y}px ${shadow.w}px)` : 'none'
        }"
      >
        <path
          ref="path"
          vector-effect="non-scaling-stroke"
          :style="{
            stroke: ele.stroke,
            strokeWidth: ele.height,
            ...marker
          }"
        />
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { ILine, IShape } from '@/store/pptInterface'
import { calcQuadrant, calcDistanceFromPointToLine } from '@/utils/calcQuadrant'
import LineMarker from '@/components/repack/LineMarker.vue'
import { Component, Ref, Prop, Vue } from 'vue-property-decorator'
@Component({
  components: { LineMarker }
})
export default class DisplayLine extends Vue {
  @Prop() readonly ele!: ILine
  @Ref('path') readonly path!: HTMLElement

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

  mounted(): void {
    this.refreshPath()
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
