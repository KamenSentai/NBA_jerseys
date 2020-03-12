export default {
  updateStep(state, name) {
    state.stepName = name
  },
  updateName(state, name) {
    state.name = name
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
