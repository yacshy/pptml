<template>
  <div
    v-show="showPptRightMenu"
    class="absolute table-right-maenu"
    style="top: 0; left: 0;"
    ref="menu"
  >
    <a-menu mode="vertical">
      <a-menu-item key="1" :disabled="list.length < 2" @click="remove">删除</a-menu-item>
      <a-menu-item key="2" @click="copy">复制</a-menu-item>
      <a-menu-item key="3" :disabled="!copyPpt.have" @click="paste">粘贴</a-menu-item>
    </a-menu>
  </div>
</template>

<script lang="ts">
import CombinedVueInstance from 'vue'
import { PPTStore } from '@/store/ppt'
import { IPPT } from '@/store/pptInterface'
import { afterFindPpt } from '@/utils/FormatParma'
import { Vue, Component, Ref } from 'vue-property-decorator'

interface IOpenParma {
  top: number
  left: number
  index: number
}

@Component
export default class PptRightMenuCard extends Vue {
  $bus!: CombinedVueInstance
  @Ref('menu') readonly menu!: HTMLElement
  get list(): IPPT[] {
    return PPTStore.list
  }

  showPptRightMenu = false
  index!: number

  copyPpt: {
    have: boolean
    value: IPPT | null
  } = {
    have: false,
    value: null
  }

  mounted(): void {
    this.$bus.$on('open-ppt-right-menu-vue', this.open)
    document.addEventListener('click', this.close)
  }

  beforeDestory(): void {
    this.$bus.$off('open-ppt-right-menu-vue')
    document.removeEventListener('click', this.close)
  }

  open({ top, left, index }: IOpenParma): void {
    this.menu.style.top = top + 'px'
    this.menu.style.left = left + 'px'
    this.index = index
    this.showPptRightMenu = true
  }

  close(): void {
    this.showPptRightMenu = false
  }

  remove(): void {
    PPTStore.setList({ index: this.index })
  }

  copy(): void {
    this.$set(this.copyPpt, 'have', true)
    const newPpt = JSON.parse(JSON.stringify(PPTStore.ppt)) as IPPT
    const timeStamp = new Date().getTime()
    newPpt.id = `ppt_${timeStamp}`
    newPpt.content.forEach((_, i) => {
      newPpt.content[i].id = `${_.type}_${timeStamp}_${i}`
    })
    this.$set(this.copyPpt, 'value', newPpt)
  }

  paste(): void {
    PPTStore.setList(afterFindPpt(this.copyPpt.value as IPPT))
    this.$set(this.copyPpt, 'have', false)
    this.$set(this.copyPpt, 'value', null)
  }
}
</script>

<style lang="scss" scoped>
.table-right-maenu {
  width: 80px;
  background-color: #ffffff;
  box-shadow: 0 0 3px #d9d9d9;
  z-index: 1000;
}
</style>
