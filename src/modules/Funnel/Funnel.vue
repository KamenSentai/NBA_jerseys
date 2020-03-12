<template>
  <div :class="$style.container">
    <h1
      :class="[
        $style.title,
        {
          ['text-light']: !!activeTeam,
        }]"
    >
      {{ currentStep.title }}
    </h1>
    <component
      :is="currentStep.component"
      @update="changeStep"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Size as FunnelSize, Team as FunnelTeam } from './components'

export default {
  name: 'Funnel',
  props: {
    activeTeam: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      steps: [
        {
          title: 'Choose your team',
          name: 'team',
          component: FunnelTeam,
          target: 'size',
        },
        {
          title: 'Choose your size',
          name: 'size',
          component: FunnelSize,
          target: '',
        },
      ],
    }
  },
  computed: {
    ...mapGetters('funnel', ['stepName']),
    currentStep() {
      return this.steps.find(step => step.name === this.stepName)
    },
  },
  methods: {
    ...mapActions('funnel', ['updateStep']),
    changeStep() {
      this.updateStep(this.currentStep.target)
    },
  },
}
</script>

<style lang="scss" module>
.container {
  display: grid;
  grid-gap: 2rem;
  align-content: flex-start;
  width: 100%;
  height: 100%;
  padding-top: 25vh;
  color: $medium;
}

.title {
  font-size: 3.2rem;
  font-family: $college;
  text-transform: uppercase;
  text-shadow: 5px 5px 5px rgba($dark, .125);;
  transition: color .5s ease-in-out;
}
</style>
