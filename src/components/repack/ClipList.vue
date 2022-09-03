<template>
  <div class="clip flex">
    <div class="cel1" @click="freeClip">
      <a-icon type="scissor" />自由剪裁
    </div>
    <div class="cel2">
      <a-popover trigger="click" placement="bottomLeft" class="pop">
        <a-button class="btn">
          <a-icon type="down" />
        </a-button>
        <div slot="content" style="width: 286px; height: 463px;">
          <div class="clip-con">
            <p>按形状：</p>
            <div class="shapes">
              <div
                v-for="(clip, index) in imageClips"
                :style="{
                  clipPath: clip.style
                }"
                @click="setClipPath(clip)"
                :key="'img-clip-' + index"
              ></div>
            </div>
            <p>按横纵比例（方形）:</p>
            <a-radio-group class="radios">
              <a-radio-button value="a" class="radio">1 : 1</a-radio-button>
            </a-radio-group>
            <p class="mag">按横纵比例（纵向）:</p>
            <a-radio-group class="radios">
              <a-radio-button value="a" class="radio">2 : 3</a-radio-button>
              <a-radio-button value="b" class="radio">3 : 4</a-radio-button>
              <a-radio-button value="c" class="radio">3 : 5</a-radio-button>
              <a-radio-button value="d" class="radio">4 : 5</a-radio-button>
            </a-radio-group>
            <p class="mag">按横纵比例（横向）:</p>
            <a-radio-group class="radios">
              <a-radio-button value="a" class="radio">3 : 2</a-radio-button>
              <a-radio-button value="b" class="radio">4 : 3</a-radio-button>
              <a-radio-button value="c" class="radio">5 : 3</a-radio-button>
              <a-radio-button value="d" class="radio">5 : 4</a-radio-button>
            </a-radio-group>
            <a-radio-group class="radios mag">
              <a-radio-button value="a" class="radio">16 : 9</a-radio-button>
              <a-radio-button value="b" class="radio">16 : 10</a-radio-button>
            </a-radio-group>
          </div>
        </div>
      </a-popover>
    </div>
  </div>
</template>

<script lang="ts">
import CombinedVueInstance from 'vue'
import { PPTStore } from '@/store/ppt'
import { CLIPPATHS, IEllipse, IPolygon, IRect } from '@/configs/imageClip'
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class ClipList extends Vue {
  $bus!: CombinedVueInstance
  get imageClips(): Array<IEllipse | IPolygon | IRect> {
    return CLIPPATHS
  }

  setClipPath(clip: IEllipse | IPolygon | IRect): void {
    PPTStore.setImageElementClip({
      i: PPTStore.pptIndex,
      j: PPTStore.activeIndex,
      data: {
        name: clip.name,
        shape: clip.type,
        style: clip.style,
        radius: clip.type === 'rect' ? clip.radius : '0%'
      }
    })
    this.$bus.$emit(
      'call-insertImageVue-ready-to-clipping-image',
      PPTStore.activeId
    )
  }

  freeClip(): void {
    this.$bus.$emit(
      'call-insertImageVue-ready-to-clipping-image',
      PPTStore.activeId
    )
  }
}
</script>

<style lang="scss" scoped>
.clip {
  width: 100%;
  height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 0;
  line-height: 32px;
  text-align: center;
  div {
    text-align: center;
  }
  .cel1 {
    width: calc(100% - 32px);
    cursor: pointer;
    &:hover {
      color: rgb(0, 145, 255);
    }
  }
  .cel2 {
    width: 32px;
    border-left: 1px solid #d9d9d9;
    .pop {
      width: 100%;
      height: 100%;
    }
    .btn {
      padding: 0;
      border-radius: 0;
      border: none;
      line-height: 32px;
      text-align: center;
    }
  }
}
.clip-con {
  width: 286px;
  height: 463px;
  .shapes {
    display: flex;
    width: 100%;
    height: auto;
    flex-wrap: wrap;
    justify-content: space-between;
    div {
      background-color: #d9d9d9;
      width: 40px;
      height: 40px;
      margin: 0 2.5% 5% 2.5%;
      cursor: pointer;
      &:hover {
        background-color: #cccccc;
      }
    }
  }
}
.radios {
  width: 100%;
  display: flex;
  .radio {
    flex: 1;
    border-radius: 0;
    line-height: 32px;
    text-align: center;
  }
}
.mag {
  margin-top: 10px;
}
</style>
