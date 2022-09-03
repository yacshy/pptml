<template>
  <div
    :id="ele.id"
    class="absolute"
    :style="{
    top: ele.top + 'px',
    left: ele.left + 'px',
    width: ele.width + 'px',
    height: ele.height + 'px',
    zIndex: ele.zIndex,
    opacity: ele.opacity,
    transform: `rotateZ(${ele.angle}deg)`
    }"
  >
    <svg
      :width="ele.width"
      :height="ele.height"
      :style="{
        filter: shadow.open ? `drop-shadow(${shadow.color} ${shadow.x}px ${shadow.y}px ${shadow.w}px)` : 'none'
      }"
    >
      <g :transform="`scale(${widthRatio}, ${heightRatio}) translate(0,0) matrix(1,0,0,1,0,0)`">
        <path
          class="shape-path"
          vector-effect="non-scaling-stroke"
          stroke-linecap="butt"
          stroke-miterlimit="8"
          :fill="ele.fill"
          :stroke="stroke"
          :stroke-width="strokeWidth"
          :d="ele.path"
        />
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { IShape } from '@/store/pptInterface'
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class DisplayShape extends Vue {
  @Prop() readonly ele!: IShape

  get stroke(): string {
    return this.ele.border.color
  }

  get strokeWidth(): number {
    const stroke = this.ele.border
    return stroke.open ? stroke.width : 0
  }

  get widthRatio(): number {
    return this.ele.width / 200
  }

  get heightRatio(): number {
    return this.ele.height / 200
  }

  get shadow(): IShape['shadow'] {
    return this.ele.shadow
  }
}
</script>

<style lang="scss" scoped>
svg {
  overflow: visible;
}
</style>
