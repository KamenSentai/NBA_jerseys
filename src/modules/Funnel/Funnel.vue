<template>
  <div :class="$style.container">
    <h1
      :class="[
        $style.title,
        {
          ['text-light']: !!activeTeam,
          [$style.isHidden]: !isLoaded,
        }]"
    >
      {{ currentStep.title }}
    </h1>
    <component
      :is="currentStep.component"
      :active-team="activeTeam"
      :class="[
        $style.component,
        {
          [$style.isHidden]: !isLoaded,
        }]"
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
      isLoaded: false,
      steps: [
        {
          title: 'Choose your team',
          name: 'team',
          component: FunnelTeam,
          target: 'size',
          isTurned: false,
        },
        {
          title: 'Choose your size',
          name: 'size',
          component: FunnelSize,
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
          target: '',
          isTurned: true,
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
  mounted() {
    setTimeout(() => {
      this.isLoaded = true
    }, 1000)
  },
  methods: {
    ...mapActions('funnel', ['finalize', 'turn', 'updateStep']),
    changeStep() {
      if (this.targetStep) {
        this.turn(this.targetStep.isTurned)
        this.updateStep(this.currentStep.target)
      } else {
        this.turn(false)
        this.finalize()
      }
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
  padding-top: 12.5vh;
  color: $medium;
}

.title {
  font-size: 3.2rem;
  font-family: $college;
  text-transform: uppercase;
  text-shadow: 5px 5px 5px rgba($dark, .125);
  transition: color .5s ease-in-out, transform 1s ease-in-out, opacity 1s ease-in-out;

  &.isHidden {
    transform: translateY(1.25rem);
  }
}

.component {
  transition: opacity 1s ease-in-out .5s;
}

.isHidden {
  opacity: 0;
  pointer-events: none;
}
</style>
