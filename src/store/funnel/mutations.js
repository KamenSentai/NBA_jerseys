export default {
  updateStep(state, name) {
    state.stepName = name
  },
  updateNumber(state, number) {
    state.number = number
  },
  updateSize(state, size) {
    state.activeSize = size
  },
  updateTeam(state, team) {
    state.activeTeam = team
  },
}
