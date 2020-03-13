<template>
  <div :class="$style.container">
    <ComponentInput
      v-model="number"
      :class="$style.input"
      min="0"
      max="99"
      placeholder="Number"
      type="number"
      @input="type($event)"
    />
    <transition name="fade">
      <ComponentButton
        v-if="!!number"
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
  name: 'Number',
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
      number: null,
    }
  },
  computed: mapGetters('funnel', ['sizes']),
  methods: {
    ...mapActions('funnel', ['updateNumber']),
    type() {
      this.number = Math.max(0, Math.min(99, this.number))
      this.updateNumber(this.number)
    },
  },
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
