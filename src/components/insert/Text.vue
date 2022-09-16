<template>
  <div @click="activeMe" ref="con" :id="ele.id" class="absolute text-con" :style="{
    zIndex: ele.zIndex,
    opacity: ele.opacity,
    top: ele.top + 'px',
    left: ele.left + 'px',
    width: ele.width + 'px',
    transform: `rotateZ(${ele.angle}deg)`,
    border: active ? '1px dashed rgb(0, 145, 255)' : '1px dashed rgba(0,0,0,0)'
  }">
    <div @mousedown.prevent="down($event)" class="edit-con fill">
      <div ref="box" class="edit-box" @mousedown.stop='focusTextBox' contenteditable @blur="blur" :style="{
        color: style.color,
        background: style.background,
        lineHeight: style.lineHeight,
        fontSize: style.fontSize + 'px',
        fontStyle: style.fontStyle,
        textAlign: style.textAlign,
        fontWeight: style.fontWeight,
        textDecoration: style.decoration,
        fontFamily: style.fontFamily,
        letterSpacing: style.letterSpacing + 'px',
        textShadow: shadow.open ? `${shadow.x}px ${shadow.y}px ${shadow.w}px ${shadow.color}` : 'none',
        border: border.open ? `${border.width}px ${border.type} ${border.color}` : 'none'
      }"></div>
    </div>
    <!-- coat -->
    <left-coat v-show="active" />
    <right-coat v-show="active" />
    <rotate-coat v-show="active" />
  </div>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { IText } from '@/store/pptInterface'
import LeftCoat from '@/components/coat/Left.vue'
import MoveCoat from '@/components/coat/Move.vue'
import RightCoat from '@/components/coat/Right.vue'
import RotateCoat from '@/components/coat/Rotate.vue'
import { Component, Prop, Ref, Mixins, Watch } from 'vue-property-decorator'
@Component({ components: { LeftCoat, RightCoat, RotateCoat } })
export default class InsertText extends Mixins(MoveCoat) {
  @Prop() declare ele: IText
  @Ref('con') declare con: HTMLElement
  @Ref('box') readonly box!: HTMLElement

  pptindex!: number
  eleindex!: number

  get shadow(): IText['shadow'] {
    return this.ele.shadow
  }

  get style(): IText['style'] {
    return this.ele.style
  }

  get border(): IText['border'] {
    return this.ele.border
  }

  mounted(): void {
    if (this.ele.content === '') {
      this.box.focus()
    } else {
      this.box.innerText = this.ele.content
    }
    this.pptindex = PPTStore.pptIndex
    this.eleindex = PPTStore.activeIndex
  }

  @Watch('active')
  activeHandle(n: boolean): void {
    if (!n) this.box.blur()
  }

  activeMe(): void {
    PPTStore.setActiveId(this.ele.id)
    this.pptindex = PPTStore.pptIndex
    this.eleindex = PPTStore.activeIndex
  }

  blur(): void {
    const content = this.box.innerText
    if (content === '') {
      PPTStore.delElement({
        index: this.pptindex,
        data: this.eleindex
      })
    } else {
      PPTStore.setTextElementInfo({
        i: this.pptindex,
        j: this.eleindex,
        data: { content }
      })
    }
  }

  focusTextBox(): void {
    this.box.focus()
  }
}
</script>

<style lang="scss" scoped>
.text-con {
  height: auto;
  min-height: 60px;

  .edit-con {
    padding: 10px;
    box-sizing: border-box;
    cursor: move;

    .edit-box {
      width: 100%;
      min-height: 40px;
      height: auto;
      outline: none;
      overflow: visible;
      box-sizing: border-box;
      cursor: text;
    }
  }
}
</style>
