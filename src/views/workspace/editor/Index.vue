<template>
  <div class="fill">
    <header class="flex menu">
      <div @click="menuIndex = 0" :class="{active:menuIndex === 0}">样式</div>
      <div @click="menuIndex = 1" :class="{active:menuIndex === 1}">{{isPPt ? '切换':'位置'}}</div>
      <div @click="menuIndex = 2" :class="{active:menuIndex === 2}">动画</div>
    </header>
    <section class="body">
      <div v-show="menuIndex === 0">
        <edit-ppt-style v-if="isPPt" />
        <edit-text-style v-else-if="type === 'text'" />
        <edit-image-style v-else-if="type === 'image'" />
        <edit-shape-style v-else-if="type === 'shape'" />
        <edit-line-style v-else-if="type === 'line'" />
        <edit-table-style v-else-if="type === 'table'" />
        <edit-audio-style v-else-if="type === 'audio'" />
        <edit-video-style v-else-if="type === 'video'" />
      </div>
      <div v-show="menuIndex === 1">
        <edit-ppt-switch-animation v-show="isPPt" />
        <Position v-show="!isPPt" />
      </div>
      <div v-show="menuIndex === 2">
        <Animation />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import Position from './Position.vue'
import Animation from './Animation.vue'
import EditPptStyle from '@/components/style/Ppt.vue'
import EditTextStyle from '@/components/style/Text.vue'
import EditImageStyle from '@/components/style/Image.vue'
import EditShapeStyle from '@/components/style/Shape.vue'
import EditLineStyle from '@/components/style/Line.vue'
import EditAudioStyle from '@/components/style/Audio.vue'
import EditVideoStyle from '@/components/style/Video.vue'
import EditTableStyle from '@/components/style/Table.vue'
import EditPptSwitchAnimation from '@/components/style/PptSwitch.vue'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {
    Position,
    Animation,
    EditPptStyle,
    EditPptSwitchAnimation,
    EditTextStyle,
    EditImageStyle,
    EditShapeStyle,
    EditLineStyle,
    EditAudioStyle,
    EditVideoStyle,
    EditTableStyle
  }
})
export default class Editor extends Vue {
  get type(): string {
    return PPTStore.active.type
  }

  get isPPt(): boolean {
    return PPTStore.active.type === 'ppt'
  }

  menuIndex = 0
}
</script>

<style lang="scss" scoped>
@import '@/scss/scroll.scss';
.menu {
  width: 100%;
  height: 40px;
  div {
    flex: 1;
    line-height: 40px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    background: #eee;
    &:nth-child(2) {
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
    }
    cursor: pointer;
  }
  .active {
    background: #fff;
    border-bottom: none;
  }
}
.body {
  width: 100%;
  padding: 10px;
  height: calc(100% - 40px);
  overflow: scroll;
  @include scroll;
}
</style>
