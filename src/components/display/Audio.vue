<template>
  <a-popover placement="bottom">
    <template slot="content">
      <audio ref="audio" :src="ele.url" controls class="audio"></audio>
    </template>
    <a-icon
      :id="ele.id"
      class="absolute"
      type="play-square"
      :style="{
        top: ele.top + 'px',
        left: ele.left + 'px',
        width: ele.width + 'px',
        height: ele.height + 'px',
        zIndex: ele.zIndex,
        fontSize: ele.size + 'px',
        color: ele.background
      }"
    />
  </a-popover>
</template>

<script lang="ts">
import { IAudio } from '@/store/pptInterface'
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class DisplayAudio extends Vue {
  @Prop() readonly ele!: IAudio

  get loop(): boolean {
    return this.ele.loop
  }
}
</script>

<style lang="scss" scoped>
.audio {
  height: 30px;
}
</style>
