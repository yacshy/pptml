<template>
  <div class="fill">
    <header class="header" @click="createPPT">
      <a-icon type="file-add" />
      <span>添加幻灯片</span>
    </header>
    <div class="ppt-list">
      <draggable v-model="list">
        <div
          v-for="(ppt, index) in list"
          @click="activeMe(ppt.id)"
          @click.right="openRightMenu(index, $event)"
          class="ppt flex"
          :key="ppt.id"
        >
          <span>{{ index > 9 ? index + 1 : `0${index+1}` }}</span>
          <div>
            <img v-show="ppt.cover" :src="ppt.cover" width="100%" height="100%" />
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import CombinedVueInstance from 'vue'
import { toPng } from 'html-to-image'
import { PPTStore } from '@/store/ppt'
import { IPPT } from '@/store/pptInterface'
import { initPPT } from '@/utils/InitPPTElement'
import { afterFindPpt } from '@/utils/FormatParma'
import draggable from 'vuedraggable'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: { draggable }
})
export default class Creator extends Vue {
  $bus!: CombinedVueInstance
  beforeMount(): void {
    if (this.list.length === 0) this.createPPT()
  }

  mounted(): void {
    const ele = (document.getElementById('canvas') as HTMLElement)
      .firstChild as HTMLElement

    let throttleFlag = true

    const observer = new MutationObserver(() => {
      if (throttleFlag) {
        setTimeout(() => {
          toPng(ele).then((url: string) => {
            PPTStore.setPPTBaseInfo(afterFindPpt({ cover: url }))
          })
          throttleFlag = true
        }, 200)
      }
      throttleFlag = false
    })
    observer.observe(ele, {
      characterData: true,
      attributes: true,
      childList: true,
      subtree: true
    })
  }

  get list(): IPPT[] {
    return PPTStore.list
  }

  set list(value: IPPT[]) {
    PPTStore.changeListOrder(value)
  }

  createPPT(): void {
    const ppt = initPPT(`ppt_${new Date().getTime()}`)
    PPTStore.setList({ index: PPTStore.list.length, data: ppt })
  }

  activeMe(id: string): void {
    PPTStore.setPptId(id)
    PPTStore.setActiveId(id)
  }

  openRightMenu(index: number, e: MouseEvent): void {
    e.preventDefault()
    this.$bus.$emit('open-ppt-right-menu-vue', {
      top: e.clientY,
      left: e.clientX,
      index
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/hover.scss';
.header {
  width: 100%;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  @include hover;
  span {
    font-weight: 500;
    margin-left: 5px;
  }
}
.ppt-list {
  width: 100%;
  height: calc(100% - 41px);
  list-style: none;
  .ppt {
    width: 100%;
    height: 70px;
    margin-top: 10px;
    cursor: pointer;
    @include hover;
    span {
      width: 29px;
      text-align: center;
      line-height: 70px;
    }
    div {
      width: 110px;
      height: 100%;
      margin: 0 9px;
      background-color: #fff;
      border: 1px solid rgb(0, 145, 255);
    }
  }
}
</style>
