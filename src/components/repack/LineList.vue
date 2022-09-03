<template>
  <div class="line-con">
    <div v-for="(lines, i) in lineList" :key="lines.type">
      <p class="shp-tle">{{lines.type}}</p>
      <div class="shp-cel">
        <svg
          v-for="(item, j) in lines.children"
          width="20"
          height="20"
          @click="line(item)"
          :key="lines.type + j"
        >
          <defs>
            <!-- 箭头 -->
            <marker
              v-if="item.points[1] === 'arrow'"
              :id="`preset-line-${i}-${j}-arrow-end`"
              markerUnits="userSpaceOnUse"
              orient="auto"
              markerWidth="6"
              markerHeight="6"
              refX="3"
              refY="3"
            >
              <path d="M0,0 L10,5 0,10 Z" fill="#999" transform="scale(0.6, 0.6) rotate(0, 5, 5)" />
            </marker>
            <!-- 圆球 -->
            <marker
              v-if="item.points[1] === 'dot'"
              :id="`preset-line-${i}-${j}-dot-end`"
              markerUnits="userSpaceOnUse"
              orient="auto"
              markerWidth="6"
              markerHeight="6"
              refX="3"
              refY="3"
            >
              <path
                d="m0 5a5 5 0 1 0 10 0a5 5 0 1 0 -10 0z"
                fill="#999"
                transform="scale(0.6, 0.6) rotate(0, 5, 5)"
              />
            </marker>
          </defs>

          <!-- 主线 -->
          <path
            :d="item.path"
            vector-effect="non-scaling-stroke"
            :style="{
              strokeDasharray: item.style === 'dashed' ? '4, 1' : 'none',
              ...marker(item.points, i, j)
            }"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CombinedVueInstance from 'vue'
import { LINE_LIST, ILine } from '@/configs/lines'
import { Vue, Component } from 'vue-property-decorator'

interface IMarker {
  markerStart: string
  markerEnd: string
}

@Component
export default class LineList extends Vue {
  $bus!: CombinedVueInstance
  get lineList(): ILine[] {
    return LINE_LIST
  }

  line(path: ILine): void {
    this.$bus.$emit('call-painter-ready-insert-line', path)
  }

  marker([s, e]: [string, string], i: number, j: number): IMarker {
    const markerStart = s
      ? s === 'dot'
        ? `url(#preset-line-${i}-${j}-dot-start)`
        : `url(#preset-line-${i}-${j}-arrow-start)`
      : 'none'
    const markerEnd = e
      ? e === 'dot'
        ? `url(#preset-line-${i}-${j}-dot-end)`
        : `url(#preset-line-${i}-${j}-arrow-end)`
      : 'none'
    return { markerStart, markerEnd }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/scroll.scss';
@import '@/scss/canvasToolList.scss';
@include canvas-tool-list;
.line-con {
  width: 200px;
}
</style>
