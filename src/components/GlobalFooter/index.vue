<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a href="https://github.com/lack-io/cirrus" target="_blank">Github</a>
      <a href="https://www.github.com/lack-io/" target="_blank">@lack</a>
    </template>
    <template v-slot:copyright>
      <a href="https://github.com/lack-io/cirrus" target="_blank">cirrus</a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
