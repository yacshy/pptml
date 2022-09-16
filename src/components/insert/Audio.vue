<template>
  <div @click="activeMe" ref="con" :id="ele.id" class="absolute" :style="{
    top: ele.top + 'px',
    left: ele.left + 'px',
    width: ele.size + 'px',
    height: ele.size + 'px',
    zIndex: ele.zIndex,
    border: active ? '1px dashed rgb(0, 145, 255)' : '1px dashed rgba(0,0,0,0)'
  }">
    <a-popover placement="bottom">
      <template slot="content">
        <audio ref="audio" :src="ele.url" controls class="audio"></audio>
      </template>
      <a-icon @mousedown.prevent="down($event)" type="play-square" :style="{
        fontSize: ele.size + 'px',
        color: ele.background,
        cursor: active ? 'move' : 'pointer'
      }" />
    </a-popover>
  </div>
</template>

<script lang="ts">
import { IAudio } from '@/store/pptInterface'
import MoveCoat from '@/components/coat/Move.vue'
import SwitchCoat from '@/components/coat/Switch.vue'
import { Mixins, Component, Prop, Ref, Watch } from 'vue-property-decorator'
@Component
export default class InsertAudio extends Mixins(MoveCoat, SwitchCoat) {
  @Prop() declare ele: IAudio
  @Ref('con') declare con: HTMLElement
  @Ref('audio') readonly audio!: HTMLAudioElement

  get loop(): boolean {
    return this.ele.loop
  }

  @Watch('loop')
  loopHandle(loop: boolean): void {
    if (loop) {
      this.audio.setAttribute('loop', 'loop')
    } else {
      this.audio.removeAttribute('loop')
    }
  }
}
</script>

<style lang="scss" scoped>
.audio {
  height: 30px;
}
</style>
