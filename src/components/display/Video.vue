<template>
  <video :src="ele.url" :id="ele.id" class="video absolute" :poster="ele.cover" :width="ele.width" :height="ele.height"
    :style="{
      top: ele.top + 'px',
      left: ele.left + 'px',
      width: ele.width + 'px',
      zIndex: ele.zIndex,
    }" controls></video>
</template>

<script lang="ts">
import { IVideo } from '@/store/pptInterface'
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class DisplayVideo extends Vue {
  @Prop() readonly ele!: IVideo
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
