export default {
  updateStep({ commit }, name) {
    commit('updateStep', name)
  },
  updateSize({ commit }, size = '') {
    commit('updateSize', size)
  },
  updateTeam({ commit }, team = null) {
    commit('updateTeam', team)
  },
}
