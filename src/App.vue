<template>
  <div id="app" class="fill">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import 'animate.css'
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class App extends Vue {}
</script>

<style lang="scss">
body,
html,
a,
i,
em,
input,
div,
span,
template,
p,
ul,
li,
ol,
img,
svg,
g,
marker,
defs,
path,
button,
video,
audio,
header,
section {
  margin: 0;
  padding: 0;
}
body,
html {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.flex {
  display: flex;
}
.fill {
  width: 100%;
  height: 100%;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}

.coat {
  width: 10px;
  height: 10px;
  border: 1px solid rgb(0, 145, 255);
  background-color: #fff;
}
.clip {
  border: 1px solid #000;
  background: #fff;
}

.radius {
  border-radius: 0;
}
</style>
