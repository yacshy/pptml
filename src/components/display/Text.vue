<template>
  <div
    class="edit-box absolute"
    :id="ele.id"
    :style="{
      zIndex: ele.zIndex,
      opacity: ele.opacity,
      top: ele.top + 'px',
      left: ele.left + 'px',
      width: ele.width + 'px',
      transform: `rotateZ(${ele.angle}deg)`,
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
    }"
  >{{ ele.content }}</div>
</template>

<script lang="ts">
import { IText } from '@/store/pptInterface'
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class DisplayText extends Vue {
  @Prop() readonly ele!: IText

  get style(): IText['style'] {
    return this.ele.style
  }

  get shadow(): IText['shadow'] {
    return this.ele.shadow
  }

  get border(): IText['border'] {
    return this.ele.border
  }
}
</script>

<style lang="scss" scoped>
.edit-box {
  min-height: 30px;
  height: auto;
  word-wrap: break-word;
}
</style>
