<template>
  <div :class="$style.container">
    <img
      :class="$style.image"
      src="@/assets/Mockup.png"
      alt="Mockup"
      draggable="false"
    >
    <ModuleSketch :class="$style.sketch" />
  </div>
</template>

<script>
import ModuleSketch from '@/modules/Sketch'

export default {
  name: 'Frame',
  components: {
    ModuleSketch,
  },
}
</script>

<style lang="scss" module>
.container {
  position: relative;
  justify-self: center;
  font-size: 0;
}

.image {
  max-width: 25vw;
  max-height: 75vh;
  opacity: 0;
}

.sketch {
  @include centralizer;
  @include overlay;
}
</style>
