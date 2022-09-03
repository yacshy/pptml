<template>
  <div class="fill">
    <header class="head">
      <ul>
        <li v-for="option in menu" :key="option.label">
          <template>
            <a-dropdown placement="bottomLeft">
              <div>
                <a-icon :type="option.icon" />
                {{option.label}}
              </div>
              <a-menu slot="overlay">
                <a-menu-item v-for="item in option.child" @click="item.event" :key="item.label">{{item.label}}</a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </li>
      </ul>
    </header>
    <section class="body flex">
      <div class="creator">
        <Creator />
      </div>
      <div class="canvas">
        <Canvas />
      </div>
      <div class="editor">
        <Editor />
      </div>
    </section>
    <table-right-menu-card />
    <ppt-right-menu-card />
  </div>
</template>

<script lang="ts">
import Creator from './creator/Index.vue'
import Canvas from './canvas/Index.vue'
import Editor from './editor/Index.vue'
import TableRightMenuCard from '@/components/style/TableRightManu.vue'
import PptRightMenuCard from '@/components/style/PptRightMenu.vue'
import { Vue, Component } from 'vue-property-decorator'
import { PPTStore } from '../../store/ppt'
@Component({
  components: { Creator, Canvas, Editor, TableRightMenuCard, PptRightMenuCard }
})
export default class Home extends Vue {
  menu = [
    {
      icon: 'file',
      label: '文件',
      child: [
        {
          label: '导入',
          event: (): void => {
            console.log('input~~~~~~~')
          }
        },
        {
          label: '导出',
          event: (): void => {
            console.log('output~~~~~~~~~~~')
          }
        }
      ]
    },
    {
      icon: 'edit',
      label: '编辑',
      child: [
        {
          label: '删除',
          event: (): void => {
            console.log('delete~~~~~~~~')
          }
        },
        {
          label: '重做',
          event: (): void => {
            console.log('redo~~~~~~~~~~~~~')
          }
        },
        {
          label: '重置幻灯片',
          event: (): void => {
            console.log('destory all~~~~~~~~~')
          }
        }
      ]
    },
    {
      icon: 'play-square',
      label: '演示',
      child: [
        {
          label: '从头开始',
          event: (): void => {
            this.$router.push('/display')
          }
        },
        {
          label: '从当前页开始',
          event: (): void => {
            console.log('display now')
          }
        }
      ]
    },
    {
      icon: 'question-circle',
      label: '帮助',
      child: [
        {
          label: '快捷键',
          event: (): void => {
            console.log(
              PPTStore.activeId,
              PPTStore.pptId,
              JSON.stringify(PPTStore.list)
            )
          }
        }
      ]
    }
  ]
}
</script>

<style lang="scss" scoped>
.head {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #ddd;
  ul {
    width: auto;
    list-style: none;
    display: flex;
    height: 100%;
    li {
      text-align: center;
      padding: 10px;
      height: 100%;
      font-size: 14px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
.body {
  width: 100%;
  height: calc(100% - 41px);
  .creator {
    width: 159px;
    height: 100%;
    border-right: 1px solid #ddd;
  }
  .canvas {
    height: 100%;
    width: calc(100% - 420px);
  }
  .editor {
    height: 100%;
    width: 259px;
    border-left: 1px solid #ddd;
  }
}
</style>
