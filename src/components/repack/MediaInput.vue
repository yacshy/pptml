<template>
  <div class="table-con">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="视频">
        <div>
          <a-input v-model="video" placeholder="please input video url" class="inp" />
        </div>
        <div>
          <a-button type="primary" class="btn" @click="insertVideo">确定</a-button>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="音频">
        <div>
          <a-input v-model="audio" placeholder="please input audio url" class="inp" />
        </div>
        <div>
          <a-button type="primary" class="btn" @click="insertAudio">确定</a-button>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import CombinedVueInstance from 'vue'
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class MediaInput extends Vue {
  $bus!: CombinedVueInstance

  video =
    'https://mazwai.com/videvo_files/video/free/2019-01/small_watermarked/181004_04_Dolphins-Whale_06_preview.webm'

  audio = 'https://freesound.org/data/previews/614/614107_11861866-lq.mp3'
  insertVideo(): void {
    this.$bus.$emit('call-painter-ready-insert-video', this.video)
  }

  insertAudio(): void {
    this.$bus.$emit('call-painter-ready-insert-audio', this.audio)
  }
}
</script>

<style lang="scss" scoped>
.table-con {
  width: 356px;
  max-height: 168px;
  .inp {
    margin-bottom: 10px;
    border-radius: 0;
  }
  .btn {
    margin-bottom: 10px;
    width: 100%;
    border-radius: 0;
  }
}
</style>
