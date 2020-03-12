<template>
  <div :class="$style.container">
    <ModuleFrame />
    <ModuleFunnel />
  </div>
</template>

<script>
import ModuleFrame from '@/modules/Frame'
import ModuleFunnel from '@/modules/Funnel'

export default {
  name: 'App',
  components: {
    ModuleFrame,
    ModuleFunnel,
  },
}
</script>

<style lang="scss" module>
.container {
  position: relative;
  display: grid;
  grid-column-gap: 4rem;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
  background: $light;

  &::before {
    background: linear-gradient(150deg, gradient(dark));
    opacity: .5;
    content: "";

    @include overlay;
  }
}
</style>
