<template>
  <div @click="activeMe" @dblclick="activeCell($event)" ref="con" :id="ele.id" class="absolute table-con" :style="{
    zIndex: ele.zIndex,
    top: ele.top + 'px',
    left: ele.left + 'px',
    width: width + 'px',
    minHeight: height + 'px',
    border: active ? '1px dashed rgb(0, 145, 255)' : '1px dashed rgba(0,0,0,0)'
  }">
    <table @mousedown.prevent="down($event), selectDown($event)" @click.right="showOptionCard" class="fill"
      :border="ele.borderWidth" :style="{
        borderColor: ele.borderColor,
        cursor: isActiveCell ? 'text' : active ? 'move' : ''
      }">
      <tbody>
        <tr v-for="(tds, i) in ele.table" :key="`${ele.id}_tr_${i}`">
          <td v-for="(td, j) in tds" class="cell" :rowspan="td.rowspan" :colspan="td.colspan" :style="{
            minHeight: td.height + 'px',
            background: td.background
          }" v-show="td.colspan !== 0" :key="`${ele.id}_tr_${i}_td_${j}`">
            <div @focus="focusCell(i, j)" @blur="blurCell(i, j, $event)" class="cell-text" :cell="`${i},${j}`" :style="{
              minWidth: td.width + 'px',
              minHeight: td.height + 'px',
              ...cellStyle(i, j)
            }"></div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- coat -->
    <left-coat v-show="active" />
    <right-coat v-show="active" />
    <rotate-coat v-show="active" />
  </div>
</template>

<script lang="ts">
import $ from 'jquery'
import CombinedVueInstance from 'vue'
import { PPTStore } from '@/store/ppt'
import { ITable } from '@/store/pptInterface'
import { afterFindTableCell, afterFindElement } from '@/utils/FormatParma'
import LeftCoat from '@/components/coat/Left.vue'
import RightCoat from '@/components/coat/Right.vue'
import RotateCoat from '@/components/coat/Rotate.vue'
import TableMoveCoat from '@/components/coat/special/TableMove.vue'
import TableSwitchCoat from '@/components/coat/special/TableSwitch.vue'
import { Mixins, Component, Prop, Ref, Watch } from 'vue-property-decorator'

@Component({ components: { LeftCoat, RightCoat, RotateCoat } })
export default class InsertTable extends Mixins(
  TableMoveCoat,
  TableSwitchCoat
) {
  $bus!: CombinedVueInstance
  @Prop() declare ele: ITable
  @Ref('con') declare con: HTMLElement

  declare active: boolean

  pptindex!: number
  activeindex!: number
  cell!: number[]

  mounted(): void {
    this.pptindex = PPTStore.pptIndex
    this.activeindex = PPTStore.activeIndex
    this.cell = this.ele.activecell
    this.ele.table.forEach((_, i) => {
      _.forEach((cell, j) => {
        if (cell.content !== '' && cell.colspan !== 0) {
          const div = this.con.querySelector(
            `div[cell='${i},${j}']`
          ) as HTMLElement
          div.innerText = cell.content
          // $(`div[cell='${i},${j}']`).text(cell.content)
        }
      })
    })
  }

  cellStyle(i: number, j: number): Record<string, string> {
    const cell = this.ele.table[i][j]
    return {
      color: cell.color,
      background: cell.background,
      fontSize: cell.fontSize + 'px',
      fontcell: cell.fontStyle,
      textAlign: cell.textAlign,
      fontWeight: cell.fontWeight,
      textDecoration: cell.decoration,
      fontStyle: cell.fontStyle,
      fontFamily: cell.fontFamily
    }
  }

  showOptionCard(e: MouseEvent): void {
    e.preventDefault()
    if (!this.isActiveCell) return
    this.$bus.$emit('open-table-right-menu-vue', {
      top: e.clientY,
      left: e.clientX,
      start: this.selectStart,
      end: this.selectEnd
    })
  }

  get width(): number {
    return this.ele.width + this.ele.borderWidth * 4 + (this.ele.col - 1) * 2
  }

  get height(): number {
    return this.ele.height + this.ele.borderWidth * 4 + (this.ele.row - 1) * 2
  }

  @Watch('active')
  activeHandle(newV: boolean): void {
    this.cancelSelect()
    if (!newV) return
    this.isActiveCell = false
    this.activeCellEle = null
    this.pptindex = PPTStore.pptIndex
    this.activeindex = PPTStore.activeIndex
  }

  cancelSelect(): void {
    this.ele.table.forEach((cells, i) => {
      cells.forEach((cell, j) => {
        // const editBox = this.con.querySelector(
        //   `div[cell='${i},${j}']`
        // ) as HTMLElement
        // editBox.style.background = cell.background
        $(`div[cell='${i},${j}']`).css('background', cell.background)
      })
    })
  }

  /**
   * active table 里的 cell
   */
  isActiveCell = false
  activeCellEle: null | HTMLElement = null
  activeCell(e: Event): void {
    if (!this.active) return
    this.activeCellEle = e.target as HTMLElement
    if (this.activeCellEle.tagName.toUpperCase() !== 'DIV') {
      this.activeCellEle = null
      return
    }
    this.isActiveCell = true
    this.activeCellEle.setAttribute('contenteditable', 'plaintext-only')
    this.activeCellEle.focus()
    this.cancelSelect()
  }

  focusCell(i: number, j: number): void {
    PPTStore.setTableElementInfo(afterFindElement({ cell: [i, j] }))
    this.cell = this.ele.activecell
  }

  blurCell(i: number, j: number, e: Event): void {
    const ele = e.target as HTMLElement
    ele.removeAttribute('contenteditable')
    if (this.active) {
      PPTStore.setTableElementCell(
        afterFindTableCell({ content: ele.innerText })
      )
    } else {
      PPTStore.setTableElementCell({
        i: this.pptindex,
        j: this.activeindex,
        posi: this.cell,
        data: { content: ele.innerText }
      })
    }
  }

  selectStart = [0, 0]
  selectEnd = [0, 0]
  selectDown(e: MouseEvent): void {
    if (!this.isActiveCell || e.button === 2) return
    document.addEventListener('mousemove', this.selectMove)
    document.addEventListener('mouseup', this.selectUp)
    const ele = e.target as HTMLElement
    this.selectStart = (ele.getAttribute('cell') as string)
      .split(',')
      .map(i => parseInt(i))
  }

  selectMove(e: MouseEvent): void {
    const ele = e.target as HTMLElement
    if (ele.tagName.toUpperCase() !== 'DIV') return
    const cellString = ele.getAttribute('cell') as string
    if (!cellString || cellString === this.selectEnd.join(',')) return
    this.selectEnd = cellString.split(',').map(i => parseInt(i))

    const [si, ei] = [
      Math.min(this.selectStart[0], this.selectEnd[0]),
      Math.max(this.selectStart[0], this.selectEnd[0])
    ]
    const [sj, ej] = [
      Math.min(this.selectStart[1], this.selectEnd[1]),
      Math.max(this.selectStart[1], this.selectEnd[1])
    ]

    this.ele.table.forEach((cells, i) => {
      cells.forEach((cell, j) => {
        const editBox = this.con.querySelector(
          `div[cell='${i},${j}']`
        ) as HTMLElement
        const style = editBox.style
        style.background = cell.background
        if (i >= si && i <= ei && j >= sj && j <= ej) {
          style.background = 'rgba(0, 225, 255, 0.445)'
        }
      })
    })
  }

  selectUp(): void {
    document.removeEventListener('mousemove', this.selectMove)
    document.removeEventListener('mouseup', this.selectUp)
  }
}
</script>

<style lang="scss" scoped>
.table-con {
  overflow: visible;
  height: auto;

  table {
    width: 100%;
    height: auto;
    border-collapse: collapse;

    tr {
      min-height: 30px;
      height: auto;
    }

    .cell {
      height: auto;
    }

    .cell-text {
      padding: 3px 0;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      outline: none;
      word-wrap: break-word;
    }
  }
}
</style>
