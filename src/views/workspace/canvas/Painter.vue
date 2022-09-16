<template>
  <div @mousedown.self="activePPT" class="fill relative" :style="{
    background
  }">
    <insert-text v-for="ele in element('text')" :ele="ele" :key="ele.id" />
    <insert-image v-for="ele in element('image')" :ele="ele" :key="ele.id" />
    <insert-shape v-for="ele in element('shape')" :ele="ele" :key="ele.id" />
    <insert-line v-for="ele in element('line')" :ele="ele" :key="ele.id" />
    <insert-table v-for="ele in element('table')" :ele="ele" :key="ele.id" />
    <insert-audio v-for="ele in element('audio')" :ele="ele" :key="ele.id" />
    <insert-video v-for="ele in element('video')" :ele="ele" :key="ele.id" />
    <svg ref="draft" width="0" height="0" class="absolute draft">
      <path ref="pencil" />
    </svg>
  </div>
</template>

<script lang="ts">
import CombinedVueInstance from 'vue'
import { PPTStore } from '@/store/ppt'
import { LinePoolItem } from '@/configs/lines'
import { IEleType } from '@/store/pptInterface'
import {
  initText,
  initImage,
  initShape,
  initLine,
  initTable,
  initVideo,
  initAudio
} from '@/utils/InitPPTElement'
import { calcAngle } from '@/utils/calcQuadrant'
import InsertText from '@/components/insert/Text.vue'
import InsertImage from '@/components/insert/Image.vue'
import InsertShape from '@/components/insert/Shape.vue'
import InsertLine from '@/components/insert/Line.vue'
import InsertTable from '@/components/insert/Table.vue'
import InsertAudio from '@/components/insert/Audio.vue'
import InsertVideo from '@/components/insert/Video.vue'
import { Vue, Component, Ref } from 'vue-property-decorator'

@Component({
  components: {
    InsertText,
    InsertImage,
    InsertShape,
    InsertLine,
    InsertTable,
    InsertAudio,
    InsertVideo
  }
})
export default class Painter extends Vue {
  $bus!: CombinedVueInstance
  @Ref('draft') readonly draft!: SVGAElement
  @Ref('pencil') readonly pencil!: SVGPathElement

  element(type: string): IEleType['ele'][] {
    return PPTStore.ppt.content.filter(i => i.type === type)
  }

  isInsertting = false

  activePPT(): void {
    if (this.isInsertting) return
    PPTStore.setActiveId(PPTStore.pptId)
  }

  get background(): string {
    const bg = PPTStore.ppt.background
    if (bg.type === 'solid') return bg.solid
    if (bg.type === 'image') {
      return `url(${bg.image.url}) center center / ${bg.image.type} no-repeat`
    }
    const { start, end } = bg.gradient
    return bg.gradient.type === 'linear'
      ? `linear-gradient(to right top ,${start}, ${end})`
      : `radial-gradient(circle farthest-corner at center, ${start}, ${end})`
  }

  endPosition = [0, 0]
  startPosition = [0, 0]

  created(): void {
    this.$bus.$on('call-painter-ready-insert-text', this.readyToInsertText)
    this.$bus.$on('call-painter-ready-insert-image', this.readyToInsertImage)
    this.$bus.$on('call-painter-ready-insert-shape', this.readyToInsertShape)
    this.$bus.$on('call-painter-ready-insert-line', this.readyToInsertLine)
    this.$bus.$on('call-painter-ready-insert-table', this.readyToInsertTable)
    this.$bus.$on('call-painter-ready-insert-video', this.readyToInsertVideo)
    this.$bus.$on('call-painter-ready-insert-audio', this.readyToInsertAudio)
  }

  beforeDestroy(): void {
    this.$bus.$off('call-painter-ready-insert-text')
    this.$bus.$off('call-painter-ready-insert-image')
    this.$bus.$off('call-painter-ready-insert-shape')
    this.$bus.$off('call-painter-ready-insert-line')
    this.$bus.$off('call-painter-ready-insert-table')
    this.$bus.$off('call-painter-ready-insert-video')
    this.$bus.$off('call-painter-ready-insert-audio')
  }

  openDraft(): void {
    this.isInsertting = true
    const [w, h] = PPTStore.ppt.ratio.value
    this.draft.setAttribute('width', w.toString())
    this.draft.setAttribute('height', h.toString())
  }

  cleanDraft(): void {
    this.pencil.setAttribute('d', '')
    this.draft.setAttribute('width', '0')
    this.draft.setAttribute('height', '0')
    this.isInsertting = false
  }

  /*******************************************************
   * 文字
   */

  readyToInsertText(): void {
    this.openDraft()
    document.addEventListener('mousedown', this.textDown)
  }

  textDown(e: MouseEvent): void {
    document.addEventListener('mousemove', this.textMove)
    document.addEventListener('mouseup', this.textUp)
    this.startPosition = [e.offsetX, e.offsetY]
    e.preventDefault()
  }

  textMove(e: MouseEvent): void {
    const [sx, sy] = this.startPosition
    const [ofx, ofy] = [e.offsetX, e.offsetY]
    this.pencil.setAttribute(
      'd',
      `M ${sx} ${sy} L ${sx} ${ofy} L ${ofx} ${ofy} L ${ofx} ${sy} L ${sx} ${sy}`
    )
    this.endPosition = [ofx, ofy]
  }

  textUp(): void {
    document.removeEventListener('mousedown', this.textDown)
    document.removeEventListener('mousemove', this.textMove)
    document.removeEventListener('mouseup', this.textUp)
    this.cleanDraft()
    const [sx, sy] = this.startPosition
    const [ex, ey] = this.endPosition
    const id = `text_${new Date().getTime()}`
    const data = initText({
      id,
      top: Math.min(sy, ey),
      left: Math.min(sx, ex),
      width: Math.abs(sx - ex),
      height: 0,
      zIndex: PPTStore.ppt.content.length + 1
    })
    PPTStore.pushElement({ index: PPTStore.pptIndex, data })
  }

  /*******************************************************
   * 图片
   */

  readyToInsertImage(parma: { w: number; h: number; url: string }): void {
    const { w, h, url } = parma
    let max = Math.max(h / 562.5, w / 1000)
    max = max > 1 ? max : 1
    const data = initImage({
      id: `img_${new Date().getTime()}`,
      width: w / max,
      height: h / max,
      zIndex: PPTStore.ppt.content.length + 1,
      url
    })
    PPTStore.pushElement({ index: PPTStore.pptIndex, data })
  }

  /*******************************************************
   * 图形
   */

  shapePath!: string
  readyToInsertShape(path: string): void {
    this.shapePath = path
    this.openDraft()
    document.addEventListener('mousedown', this.shapeDown)
  }

  shapeDown(e: MouseEvent): void {
    document.addEventListener('mousemove', this.shapeMove)
    document.addEventListener('mouseup', this.shapeUp)
    this.startPosition = [e.offsetX, e.offsetY]
    e.preventDefault()
  }

  shapeMove(e: MouseEvent): void {
    const [sx, sy] = this.startPosition
    const [ofx, ofy] = [e.offsetX, e.offsetY]

    this.pencil.setAttribute(
      'd',
      `M ${sx} ${sy} L ${sx} ${ofy} L ${ofx} ${ofy} L ${ofx} ${sy} L ${sx} ${sy}`
    )
    this.endPosition = [ofx, ofy]
  }

  shapeUp(): void {
    document.removeEventListener('mousedown', this.shapeDown)
    document.removeEventListener('mousemove', this.shapeMove)
    document.removeEventListener('mouseup', this.shapeUp)
    this.cleanDraft()
    const [sx, sy] = this.startPosition
    const [ex, ey] = this.endPosition
    const data = initShape({
      id: `shape_${new Date().getTime()}`,
      top: Math.min(sy, ey),
      left: Math.min(sx, ex),
      width: Math.abs(sx - ex),
      height: Math.abs(sy - ey),
      zIndex: PPTStore.ppt.content.length + 1,
      path: this.shapePath
    })
    PPTStore.pushElement({ index: PPTStore.pptIndex, data })
  }

  /*******************************************************
   * 线条
   */

  line!: LinePoolItem
  readyToInsertLine(line: LinePoolItem): void {
    this.openDraft()
    this.line = line
    document.addEventListener('mousedown', this.lineDown)
  }

  lineDown(e: MouseEvent): void {
    document.addEventListener('mousemove', this.lineMove)
    document.addEventListener('mouseup', this.lineUp)
    this.startPosition = [e.offsetX, e.offsetY]
    e.preventDefault()
  }

  lineMove(e: MouseEvent): void {
    const [sx, sy] = this.startPosition
    const [ofx, ofy] = [e.offsetX, e.offsetY]
    this.pencil.setAttribute('d', `M ${sx} ${sy} L ${ofx} ${ofy}`)
    this.endPosition = [ofx, ofy]
  }

  lineUp(): void {
    document.removeEventListener('mousedown', this.lineDown)
    document.removeEventListener('mousemove', this.lineMove)
    document.removeEventListener('mouseup', this.lineUp)
    this.cleanDraft()
    const [sx, sy] = this.startPosition
    const [ex, ey] = this.endPosition

    const width = Math.sqrt((ey - sy) ** 2 + (ex - sx) ** 2)
    const angle = calcAngle(sx, sy, ex, ey)
    const waistPosition = [
      (this.startPosition[0] + this.endPosition[0]) / 2,
      (this.startPosition[1] + this.endPosition[1]) / 2
    ]

    const data = initLine({
      id: `line_${new Date().getTime()}`,
      top: sy,
      left: sx,
      width,
      angle,
      line: JSON.parse(JSON.stringify(this.line)),
      zIndex: PPTStore.ppt.content.length + 1,
      startPosition: this.startPosition,
      waistPosition,
      endPosition: this.endPosition
    })
    PPTStore.pushElement({ index: PPTStore.pptIndex, data })
  }

  /*******************************************************
   * 表格
   */

  readyToInsertTable({ col, row }: { col: number; row: number }): void {
    if (col === 0 || row === 0) return
    const data = initTable({
      id: `table_${new Date().getTime()}`,
      col,
      row,
      zIndex: PPTStore.ppt.content.length + 1
    })
    PPTStore.pushElement({ index: PPTStore.pptIndex, data })
  }

  /*******************************************************
   * 媒体
   */

  readyToInsertVideo(url: string): void {
    const video = document.createElement('video')
    video.src = url
    video.oncanplay = function () {
      const data = initVideo({
        id: `video_${new Date().getTime()}`,
        url,
        width: video.videoWidth,
        height: video.videoHeight,
        zIndex: PPTStore.ppt.content.length + 1
      })
      PPTStore.pushElement({ index: PPTStore.pptIndex, data })
    }
  }

  readyToInsertAudio(url: string): void {
    const data = initAudio({
      id: `audio_${new Date().getTime()}`,
      url,
      zIndex: PPTStore.ppt.content.length + 1
    })
    PPTStore.pushElement({ index: PPTStore.pptIndex, data })
  }
}
</script>

<style lang="scss" scoped>
.draft {
  top: 0;
  left: 0;
  background: transparent;
  z-index: 1000;

  path {
    fill: transparent;
    stroke-width: 1;
    stroke-dasharray: 4, 4;
    stroke: rgb(0, 145, 255);
  }
}
</style>
