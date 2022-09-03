<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { afterFindElement } from '@/utils/FormatParma'
import { IEleType, ILine } from '@/store/pptInterface'
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class MoveCoat extends Vue {
  /***************************************
   * 用于移动元素
   */
  con!: HTMLElement
  ele!: IEleType['ele']
  get active(): boolean {
    return PPTStore.activeId === this.ele.id
  }

  offset = [0, 0]
  startPosition = [0, 0]
  newStartPosition = [0, 0]

  down(e: MouseEvent): void {
    if (!this.active) return
    document.addEventListener('mousemove', this.move)
    document.addEventListener('mouseup', this.up)
    this.startPosition = [e.screenX, e.screenY]
  }

  move(e: MouseEvent): void {
    const [sx, sy] = this.startPosition
    this.offset = [e.screenX - sx, e.screenY - sy]

    const { left, top } = this.ele
    this.newStartPosition = [left + this.offset[0], top + this.offset[1]]

    const style = this.con.style
    style.top = `${this.newStartPosition[1]}px`
    style.left = `${this.newStartPosition[0]}px`
  }

  up(): void {
    this.con.removeEventListener('mousedown', this.down)
    document.removeEventListener('mousemove', this.move)
    document.removeEventListener('mouseup', this.up)
    // 因为再line的startIcon，endIcon等操作中要通过startPosition来计算，所以此处特殊对待
    if (this.ele.type === 'line') {
      const [ex, ey] = (this.ele as ILine).endPosition
      const [left, top] = this.newStartPosition
      const [owx, owy] = (this.ele as ILine).waistPosition
      const [nex, ney] = [ex + this.offset[0], ey + this.offset[1]]
      PPTStore.setLineElementSizeAndPosition(
        afterFindElement({
          top,
          left,
          startPosition: [left, top],
          endPosition: [nex, ney],
          waistPosition: [owx + this.offset[0], owy + this.offset[1]]
        })
      )
      return
    }
    // 其它类型
    PPTStore.setElementBaseInfo(
      afterFindElement({
        top: this.newStartPosition[1],
        left: this.newStartPosition[0]
      })
    )
  }
}
</script>
