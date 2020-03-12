<template>
  <div :class="$style.container">
    <ComponentButton
      v-for="team in teams"
      :key="team.slug"
      :class="$style.button"
      :color="team.colors[1]"
      :is-active="activeSlug === team.slug"
      :is-darkable="team.isDarkable"
      @click="click($event, team)"
      @enter="updateTeam(team)"
      @leave="updateTeam(activeTeam)"
    >
      {{ team.name }}
    </ComponentButton>
    <transition name="fade">
      <ComponentButton
        v-if="!!activeTeam"
        :class="$style.button"
        :color="activeTeam.colors[1]"
        is-button
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
  name: 'Team',
  components: {
    ComponentButton,
    ComponentIcon,
  },
  data() {
    return {
      activeSlug: '',
    }
  },
  computed: {
    ...mapGetters('funnel', ['teams']),
    activeTeam() {
      return this.teams.find(team => team.slug === this.activeSlug)
    },
  },
  methods: {
    ...mapActions('funnel', ['updateTeam']),
    click(event, team) {
      this.activeSlug = event ? team.slug : ''
      this.updateTeam(team)
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
