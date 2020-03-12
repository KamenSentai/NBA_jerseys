<template>
  <div :class="$style.container">
    <ModuleFrame />
  </div>
</template>

<script>
import ModuleFrame from '@/modules/Frame'

export default {
  name: 'App',
  components: {
    ModuleFrame,
  },
}
</script>

<style lang="scss" module>
.container {
  display: grid;
  grid-column-gap: 4rem;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
}
</style>
