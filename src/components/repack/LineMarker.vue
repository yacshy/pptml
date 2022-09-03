<template>
  <defs>
    <!-- 箭头 -->
    <marker
      v-if="line.points[1] === 'arrow'"
      :id="`${ele.id}-arrow-end`"
      markerUnits="userSpaceOnUse"
      orient="auto"
      :markerWidth="markerRatio"
      :markerHeight="markerRatio"
      :refX="markerRatio / 2"
      :refY="markerRatio / 2"
    >
      <path
        d="m0 5a5 5 0 1 0 10 0a5 5 0 1 0 -10 0z"
        fill="#999"
        :transform="`scale(${markerRatio / 10}, ${markerRatio / 10}) rotate(0, 5, 5)`"
      />
    </marker>
    <!-- 圆球 -->
    <marker
      v-if="line.points[1] === 'dot'"
      :id="`${ele.id}-dot-end`"
      markerUnits="userSpaceOnUse"
      orient="auto"
      :markerWidth="markerRatio"
      :markerHeight="markerRatio"
      :refX="markerRatio / 2"
      :refY="markerRatio / 2"
    >
      <path
        d="m0 5a5 5 0 1 0 10 0a5 5 0 1 0 -10 0z"
        fill="#999"
        :transform="`scale(${markerRatio / 10}, ${markerRatio / 10}) rotate(0, 5, 5)`"
      />
    </marker>
  </defs>
</template>

<script lang="ts">
import { ILine } from '@/store/pptInterface'
import { LinePoolItem } from '@/configs/lines'
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class LineMarker extends Vue {
  @Prop() readonly ele!: ILine
  get line(): LinePoolItem {
    return this.ele.line
  }

  get markerRatio(): number {
    return this.ele.height * 3
  }
}
</script>

<style lang="scss" scoped>
</style>
