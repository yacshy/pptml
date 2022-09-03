<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { IEleType } from '@/store/pptInterface'
import { afterFindPpt } from '@/utils/FormatParma'
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class SwitchCoat extends Vue {
  /*****************************************
   * 用于触发 / 删除元素
   */
  ele!: IEleType['ele']
  active!: boolean

  mounted(): void {
    document.addEventListener('keydown', this.deleteMe)
  }

  activeMe(): void {
    PPTStore.setActiveId(this.ele.id)
  }

  deleteMe(e: KeyboardEvent): void {
    if (!(this.active && e.keyCode === 8)) return
    PPTStore.delElement(afterFindPpt(PPTStore.activeIndex))
    document.removeEventListener('keydown', this.deleteMe)
  }
}
</script>
