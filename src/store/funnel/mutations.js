export default {
  updateStep(state, name) {
    state.stepName = name
  },
  updateTeam(state, team = null) {
    state.activeTeam = team
  },
}
