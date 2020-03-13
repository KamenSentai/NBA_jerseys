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
      :active-team="activeTeam"
      @update="changeStep"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {
  Name as FunnelName,
  Number as FunnelNumber,
  Size as FunnelSize,
  Team as FunnelTeam,
} from './components'

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
          target: 'number',
          isTurned: false,
        },
        {
          title: 'Write your number',
          name: 'number',
          component: FunnelNumber,
          target: 'name',
          isTurned: false,
        },
        {
          title: 'Write your name',
          name: 'name',
          component: FunnelName,
          target: 'size',
          isTurned: true,
        },
        {
          title: 'Choose your size',
          name: 'size',
          component: FunnelSize,
          target: '',
          isTurned: false,
        },
      ],
    }
  },
  computed: {
    ...mapGetters('funnel', ['stepName']),
    currentStep() {
      return this.steps.find(step => step.name === this.stepName)
    },
    targetStep() {
      return this.steps.find(step => step.name === this.currentStep.target)
    },
  },
  methods: {
    ...mapActions('funnel', ['turn', 'updateStep']),
    changeStep() {
      this.turn(this.targetStep.isTurned)
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
