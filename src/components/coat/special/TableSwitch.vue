<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { ITable } from '@/store/pptInterface'
import { afterFindPpt } from '@/utils/FormatParma'
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class TableSwitchCoat extends Vue {
  ele!: ITable
  con!: HTMLElement
  active!: boolean
  isActiveCell!: boolean
  mounted(): void {
    document.addEventListener('keydown', this.deleteMe)
  }

  /**
   * 点击与删除元素
   */
  activeMe(): void {
    if (this.active) return
    PPTStore.setActiveId(this.ele.id)
  }

  deleteMe(e: KeyboardEvent): void {
    if (!(this.active && e.keyCode === 8) || this.isActiveCell) return
    PPTStore.delElement(afterFindPpt(PPTStore.activeIndex))
    document.removeEventListener('keydown', this.deleteMe)
  }
}
</script>
