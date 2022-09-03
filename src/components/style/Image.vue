<template>
  <div class="fill">
    <clip-list />
    <a-divider />
    <edit-shadow :ele="ele" />
    <edit-filter :ele="ele" />
    <a-divider />
    <edit-opacity :ele="ele" />
  </div>
</template>

<script lang="ts">
import { PPTStore } from '@/store/ppt'
import { IImage } from '@/store/pptInterface'
import ClipList from '@/components/repack/ClipList.vue'
import EditShadow from '@/components/style/Shadow.vue'
import EditFilter from '@/components/style/Filter.vue'
import EditOpacity from '@/components/style/Opacity.vue'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {
    ClipList,
    EditShadow,
    EditFilter,
    EditOpacity
  }
})
export default class EditImageStyle extends Vue {
  get ele(): IImage {
    return PPTStore.active as IImage
  }
}
</script>

<style lang="scss" scoped>
</style>
