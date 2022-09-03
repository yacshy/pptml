<template>
  <div
    @click="activeMe"
    ref="con"
    :id="ele.id"
    class="absolute"
    :style="{
      zIndex: ele.zIndex,
      opacity: ele.opacity,
      transform: `rotateZ(${ele.angle}deg)`,
      top: ele.top + 'px',
      left: ele.left + 'px',
      width: ele.width + 'px',
      height: ele.height + 'px',
      border: active ? '1px dashed rgb(0, 145, 255)' : '1px dashed rgba(0,0,0,0)'
    }"
  >
    <svg
      :width="ele.width"
      :height="ele.height"
      @mousedown.prevent="down($event)"
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
    <!-- coat -->
    <top-coat v-show="active" />
    <left-coat v-show="active" />
    <right-coat v-show="active" />
    <rotate-coat v-show="active" />
    <bottom-coat v-show="active" />
  </div>
</template>

<script lang="ts">
import { IShape } from '@/store/pptInterface'
import TopCoat from '@/components/coat/Top.vue'
import MoveCoat from '@/components/coat/Move.vue'
import LeftCoat from '@/components/coat/Left.vue'
import RightCoat from '@/components/coat/Right.vue'
import RotateCoat from '@/components/coat/Rotate.vue'
import BottomCoat from '@/components/coat/Bottom.vue'
import SwitchCoat from '@/components/coat/Switch.vue'
import { Component, Prop, Ref, Mixins } from 'vue-property-decorator'
@Component({
  components: { TopCoat, LeftCoat, RightCoat, RotateCoat, BottomCoat }
})
export default class InsertShape extends Mixins(SwitchCoat, MoveCoat) {
  @Prop() readonly ele!: IShape
  @Ref('con') readonly con!: HTMLElement

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
  .shape-path {
    cursor: move;
  }
}
</style>
