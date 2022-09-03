<template>
  <div class="fill">
    <a-card class="card">
      <a-card-grid
        v-for="(ani,index) in animations"
        @click="setSwitchAnimation(ani.value)"
        class="grid"
        :key="'switchAni_' + index"
      >
        <div :class="{ active: isActive === index }"></div>
        {{ani.label}}
      </a-card-grid>
    </a-card>
    <a-button @click="useToAllppt" class="fill-btn">应用到全部</a-button>
  </div>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { afterFindPpt } from '@/utils/FormatParma'
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class EditPptSwitchAnimation extends Vue {
  get switchAnimation(): string[] {
    return PPTStore.ppt.switchAnimation
  }

  animations = [
    { label: '无', value: ['none', 'none'] },
    { label: '淡入淡出', value: ['fadeIn', 'fadeOut'] },
    { label: '左右推移', value: ['slideInRight', 'slideOutLeft'] },
    { label: '上下推移', value: ['slideInDown', 'slideOutUp'] }
  ]

  get isActive(): number {
    return this.animations.findIndex(
      ani => ani.value.join('') === PPTStore.ppt.switchAnimation.join('')
    )
  }

  setSwitchAnimation(ani: string[]): void {
    PPTStore.setPPTBaseInfo(afterFindPpt({ switchAnimation: ani }))
  }

  useToAllppt(): void {
    PPTStore.useCurrentSwitchAnimationToAllPPt(PPTStore.pptIndex)
  }
}
</script>

<style lang="scss" scoped>
.fill-btn {
  margin-top: 10px;
  width: 100%;
  border-radius: 0;
}
.card {
  width: 100%;
  .grid {
    width: 50%;
    height: 90px;
    text-align: center;
    cursor: pointer;
    div {
      width: 100%;
      height: 30px;
      background-color: #d9d9dd;
    }
    .active {
      background-color: rgb(0, 145, 255);
    }
  }
}
</style>
