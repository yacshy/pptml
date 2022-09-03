<template>
  <div
    v-show="showTableRightMenu"
    class="absolute table-right-maenu"
    style="top: 0; left: 0;"
    ref="menu"
  >
    <a-menu mode="vertical">
      <a-sub-menu key="sub1">
        <span slot="title">插入列</span>
        <a-menu-item key="1" @click="insertBeforeCol">向前插入</a-menu-item>
        <a-menu-item key="2" @click="insertAfterCol">向后插入</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title">插入行</span>
        <a-menu-item key="3" @click="insertBeforeRow">向前插入</a-menu-item>
        <a-menu-item key="4" @click="insertAfterRow">向后插入</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="5" @click="delCol">删除列</a-menu-item>
      <a-menu-item key="6" @click="delRow">删除行</a-menu-item>
      <a-menu-item key="7" @click="mergeCell">合并单元格</a-menu-item>
    </a-menu>
  </div>
</template>

<script lang="ts">
import CombinedVueInstance from 'vue'
import { PPTStore } from '@/store/ppt'
import { afterFindElement } from '@/utils/FormatParma'
import { Vue, Component, Ref } from 'vue-property-decorator'

interface IOpenParma {
  top: number
  left: number
  start: number[]
  end: number[]
}

@Component
export default class TableRightMenuCard extends Vue {
  $bus!: CombinedVueInstance
  @Ref('menu') readonly menu!: HTMLElement
  showTableRightMenu = false

  start!: number[]
  end!: number[]

  mounted(): void {
    this.$bus.$on('open-table-right-menu-vue', this.open)
    document.addEventListener('click', this.close)
  }

  open({ top, left, start, end }: IOpenParma): void {
    this.menu.style.top = top + 'px'
    this.menu.style.left = left + 'px'
    this.start = start
    this.end = end
    this.showTableRightMenu = true
  }

  close(): void {
    this.showTableRightMenu = false
  }

  insertBeforeCol(): void {
    PPTStore.spliceCol(
      afterFindElement({
        type: 'insert',
        index: Math.min(this.start[1], this.end[1])
      })
    )
  }

  insertAfterCol(): void {
    PPTStore.spliceCol(
      afterFindElement({
        type: 'insert',
        index: Math.max(this.start[1], this.end[1]) + 1
      })
    )
  }

  insertBeforeRow(): void {
    PPTStore.spliceRow(
      afterFindElement({
        type: 'insert',
        index: Math.min(this.start[0], this.end[0])
      })
    )
  }

  insertAfterRow(): void {
    PPTStore.spliceRow(
      afterFindElement({
        type: 'insert',
        index: Math.max(this.start[0], this.end[0]) + 1
      })
    )
  }

  delCol(): void {
    PPTStore.spliceCol(
      afterFindElement({ type: 'delete', index: this.start[1] })
    )
  }

  delRow(): void {
    PPTStore.spliceRow(
      afterFindElement({ type: 'delete', index: this.start[0] })
    )
  }

  mergeCell(): void {
    PPTStore.mergeCell(afterFindElement({ start: this.start, end: this.end }))
  }
}
</script>

<style lang="scss" scoped>
.table-right-maenu {
  width: 120px;
  background-color: #ffffff;
  box-shadow: 0 0 3px #d9d9d9;
  z-index: 1000;
}
</style>
