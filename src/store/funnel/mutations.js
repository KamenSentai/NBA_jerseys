export default {
  turn(state, value) {
    state.isTurned = value === undefined ? !state.isTurned : value
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
  updateStep(state, name) {
    state.stepName = name
  },
  updateTeam(state, team) {
    state.activeTeam = team
  },
}
