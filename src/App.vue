<template>
  <div
    :class="$style.container"
    :style="style"
  >
    <ModuleFrame />
    <ModuleFunnel :active-team="activeTeam" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ModuleFrame from '@/modules/Frame'
import ModuleFunnel from '@/modules/Funnel'

export default {
  name: 'App',
  components: {
    ModuleFrame,
    ModuleFunnel,
  },
  computed: {
    ...mapGetters('funnel', ['activeTeam']),
    style() {
      const primary = this.activeTeam ? this.activeTeam.colors[0] : null
      return {
        backgroundColor: primary,
      }
    },
  },
}
</script>

<style lang="scss" module>
.container {
  position: relative;
  z-index: 1;
  display: grid;
  grid-column-gap: 4rem;
  grid-template-columns: .75fr 1.25fr;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 4rem;
  background: $light;
  transition: background-color .5s ease-in-out;

  &::before,
  &::after {
    content: "";
    pointer-events: none;
    @include overlay {
      z-index: -1;
    };
  }

  &::before {
    background: linear-gradient(150deg, gradient(dark));
    opacity: .5;
  }

  &::after {
    background-color: rgba($light, .125);
  }
}
</style>
