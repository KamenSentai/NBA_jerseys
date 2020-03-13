<template>
  <div
    :class="$style.container"
    :style="style"
  >
    <ModuleFrame ref="front" />
    <ModuleFrame
      v-if="isFinalized"
      ref="back"
      is-reverse
    />
    <ModuleFunnel
      v-else
      :active-team="activeTeam"
    />
    <ComponentButton
      :class="[
        $style.button,
        {
          [$style.isHidden]: !isFinalized,
        }
      ]"
      :color="activeTeam ? activeTeam.colors[1] : '#808080'"
      is-button
      is-large
      @click="click"
    >
      Buy my unique jersey
    </ComponentButton>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ModuleFrame from '@/modules/Frame'
import ModuleFunnel from '@/modules/Funnel'
import { Button as ComponentButton } from '@/components/Button'

export default {
  name: 'App',
  components: {
    ModuleFrame,
    ModuleFunnel,
    ComponentButton,
  },
  computed: {
    ...mapGetters('funnel', ['activeTeam', 'isFinalized']),
    style() {
      const primary = this.activeTeam ? this.activeTeam.colors[0] : null
      return {
        backgroundColor: primary,
      }
    },
  },
  methods: {
    click() {
      this.$refs.front.$refs.wrapper.sketch.saveCanvas('NBA_jerseys-front', 'png')
      this.$refs.back.$refs.wrapper.sketch.saveCanvas('NBA_jerseys-back', 'png')
    },
  },
}
</script>

<style lang="scss" module>
.container {
  position: relative;
  z-index: 1;
  display: grid;
  grid-gap: 4rem;
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr 1fr;
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

.button {
  grid-column: span 2;
  justify-self: center;
  transition: opacity .25s ease-in-out;;

  &.isHidden {
    opacity: 0;
  }
}
</style>
