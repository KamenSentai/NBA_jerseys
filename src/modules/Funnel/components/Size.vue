<template>
  <div :class="$style.container">
    <ComponentButton
      v-for="size in sizes"
      :key="`size-${size}`"
      :class="$style.button"
      :color="activeTeam.colors[1]"
      :is-active="activeSize === size"
      :is-darkable="activeTeam.isDarkable"
      @click="click($event, size)"
      @enter="updateSize(size)"
      @leave="updateSize(activeSize)"
    >
      {{ size.toUpperCase() }}
    </ComponentButton>
    <transition name="fade">
      <ComponentButton
        v-if="!!activeSize"
        :class="$style.button"
        :color="activeTeam.colors[1]"
        is-button
        @click="$emit('update')"
      >
        <ComponentIcon
          name="Arrow"
          :class="$style.icon"
          :color="activeTeam.isDarkable ? 'dark' : 'light'"
          width="18px"
        />
      </ComponentButton>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Button as ComponentButton } from '@/components/Button'
import { Icon as ComponentIcon } from '@/components/Icon'

export default {
  name: 'Size',
  components: {
    ComponentButton,
    ComponentIcon,
  },
  props: {
    activeTeam: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activeSize: '',
    }
  },
  computed: mapGetters('funnel', ['sizes']),
  methods: {
    ...mapActions('funnel', ['updateSize']),
    click(event, size) {
      this.activeSize = event ? size : ''
      this.updateSize(this.activeSize)
    },
  },
}
</script>

<style lang="scss" module>
.container {
  margin: -5px;
}

.button {
  margin: .5rem;
}

.icon {
  position: absolute;
}
</style>
