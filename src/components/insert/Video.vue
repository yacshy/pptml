<template>
  <div
    @click="activeMe"
    ref="con"
    :id="ele.id"
    class="absolute"
    :style="{
      top: ele.top + 'px',
      left: ele.left + 'px',
      width: ele.width + 'px',
      zIndex: ele.zIndex,
      border: active ? '1px dashed rgb(0, 145, 255)' : '1px dashed rgba(0,0,0,0)'
    }"
  >
    <video
      :src="ele.url"
      @mousedown.prevent="down($event)"
      class="video"
      :poster="ele.cover"
      :width="ele.width"
      :height="ele.height"
      :style="{
        cursor: active ? 'move' : 'pointer'
      }"
      :controls="!active"
    ></video>

    <!-- coat -->
    <left-coat v-show="active" />
    <right-coat v-show="active" />
    <top-coat v-show="active" />
    <bottom-coat v-show="active" />
  </div>
</template>

<script lang="ts">
import { IAudio } from '@/store/pptInterface'
import LeftCoat from '@/components/coat/Left.vue'
import RightCoat from '@/components/coat/Right.vue'
import TopCoat from '@/components/coat/Top.vue'
import BottomCoat from '@/components/coat/Bottom.vue'
import MoveCoat from '@/components/coat/Move.vue'
import SwitchCoat from '@/components/coat/Switch.vue'
import { Mixins, Component, Prop, Ref } from 'vue-property-decorator'
@Component({
  components: { LeftCoat, RightCoat, TopCoat, BottomCoat }
})
export default class InsertVideo extends Mixins(MoveCoat, SwitchCoat) {
  @Prop() readonly ele!: IAudio
  @Ref('con') readonly con!: HTMLElement
}
</script>

<style lang="scss" scoped>
.video-con {
  height: auto;
}
.video {
  object-fit: cover;
}
</style>
