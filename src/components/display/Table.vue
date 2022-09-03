<template>
  <table
    :id="ele.id"
    class="absolute"
    :border="ele.borderWidth"
    :style="{
      zIndex: ele.zIndex,
      opacity: ele.opacity,
      top: ele.top + 'px',
      left: ele.left + 'px',
      width: width + 'px',
      minHeight: height + 'px',
      borderColor: ele.borderColor
    }"
  >
    <tbody>
      <tr v-for="(tds, i) in ele.table" :key="`${ele.id}_tr_${i}`">
        <td
          v-for="(td, j) in tds"
          class="cell"
          :rowspan="td.rowspan"
          :colspan="td.colspan"
          :style="{
              minHeight: td.height + 'px',
              background: td.backround
            }"
          v-show="td.colspan !== 0"
          :key="`${ele.id}_tr_${i}_td_${j}`"
        >
          <div
            class="cell-text"
            :cell="`${i},${j}`"
            :style="{
                minWidth: td.width + 'px',
                minHeight: td.height + 'px',
                ...cellStyle(i, j)
              }"
          >{{ td.content }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { ITable } from '@/store/pptInterface'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class DisplayTable extends Vue {
  @Prop() readonly ele!: ITable
  cell!: number[]

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

  get width(): number {
    return this.ele.width + this.ele.borderWidth * 4 + (this.ele.col - 1) * 2
  }

  get height(): number {
    return this.ele.height + this.ele.borderWidth * 4 + (this.ele.row - 1) * 2
  }
}
</script>

<style lang="scss" scoped>
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
</style>
