<template>
  <div :class="$style.container">
    <ComponentInput
      v-model="name"
      :class="$style.input"
      placeholder="Name"
      @input="updateName($event)"
    />
    <transition name="fade">
      <ComponentButton
        v-if="!!name"
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
import { Input as ComponentInput } from '@/components/Input'

export default {
  name: 'Name',
  components: {
    ComponentButton,
    ComponentIcon,
    ComponentInput,
  },
  props: {
    activeTeam: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: null,
    }
  },
  computed: mapGetters('funnel', ['sizes']),
  methods: mapActions('funnel', ['updateName']),
}
</script>

<style lang="scss" module>
.container {
  margin: -5px;
}

.input,
.button {
  margin: .5rem;
}

.icon {
  position: absolute;
}
</style>
