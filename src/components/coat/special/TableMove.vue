<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { ITable } from '@/store/pptInterface'
import { afterFindElement } from '@/utils/FormatParma'
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class TableMoveCoat extends Vue {
  ele!: ITable
  con!: HTMLElement
  active!: boolean
  isActiveCell!: boolean
  /**
   * 移动元素
   */
  offset = [0, 0]
  newStartPosition = [0, 0]
  startPosition = [0, 0]

  down(e: MouseEvent): void {
    if (this.isActiveCell || !this.active) return
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
    PPTStore.setElementBaseInfo(
      afterFindElement({
        top: this.newStartPosition[1],
        left: this.newStartPosition[0]
      })
    )
  }
}
</script>
