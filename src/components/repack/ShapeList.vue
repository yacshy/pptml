<template>
  <div class="shp-con">
    <div v-for="shapes in shapeList" :key="shapes.type">
      <p class="shp-tle">{{shapes.type}}</p>
      <div class="shp-cel">
        <svg
          v-for="(item, index) in shapes.children"
          width="20"
          height="20"
          :key="shapes.type + index"
        >
          <g transform="scale(0.1, 0.1) translate(0,0) matrix(1,0,0,1,0,0)">
            <path vector-effect="non-scaling-stroke" :d="item.path" @click="shape(item.path)" />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CombinedVueInstance from 'vue'
import { SHAPE_LIST, IShapeList } from '@/configs/shapes'
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class ShapeList extends Vue {
  $bus!: CombinedVueInstance
  get shapeList(): IShapeList[] {
    return SHAPE_LIST
  }

  shape(path: string): void {
    this.$bus.$emit('call-painter-ready-insert-shape', path)
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/scroll.scss';
@import '@/scss/canvasToolList.scss';
@include canvas-tool-list;
.shp-con {
  width: 400px;
}
</style>
