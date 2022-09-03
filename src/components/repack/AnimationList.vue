<template>
  <div class="fill">
    <div v-for="group in list" :key="group.type">
      <p class="title" :class="type">{{group.name}}</p>
      <div class="flex ani-group">
        <div
          @click="setAnimationForEle(ani.value, ani.name)"
          @mouseenter="displayAnimation(ani.value, $event)"
          v-for="ani in group.children"
          class="ani-mask"
          :key="ani.value"
        >
          <div class="fill">{{ani.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CombinedVueInstance from 'vue'
import { PPTStore } from '@/store/ppt'
import { afterFindPpt } from '@/utils/FormatParma'
import { ITypeAnimation } from '@/configs/animation'
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class AnimationList extends Vue {
  $bus!: CombinedVueInstance

  @Prop() readonly type!: string
  @Prop() readonly list!: Array<ITypeAnimation>

  displayAnimation(value: string, e: MouseEvent): void {
    const ele = (e.target as HTMLElement).querySelector('div') as HTMLElement
    ele.className = ele.className.replaceAll(/ animate__([a-zA-Z].+)/g, '')
    ele.className += ` animate__animated animate__${value}`
    setTimeout(() => {
      ele.className = ele.className.replaceAll(/ animate__([a-zA-Z].+)/g, '')
    }, 1000)
  }

  setAnimationForEle(value: string, name: string): void {
    const data = {
      type: this.type,
      name,
      value,
      activeId: PPTStore.activeId
    }
    PPTStore.pushAnimation(afterFindPpt(data))
    this.$bus.$emit('call-animationvue-display-animation', data)
  }
}
</script>

<style lang="scss" scoped>
.title {
  padding: 5px;
  font-weight: 900;
  box-sizing: border-box;
}
.into {
  background-color: rgba(5, 76, 41, 0.5);
}
.stress {
  background-color: rgba(235, 154, 113, 0.5);
}
.exit {
  background-color: rgba(216, 66, 66, 0.5);
}
.ani-group {
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  .ani-mask {
    width: 115px;
    height: 30px;
    margin: 0 8px 10px 0;
    cursor: pointer;
    div {
      text-align: center;
      line-height: 30px;
      background-color: #eee;
    }
  }
}
</style>
