export default {
  updateStep({ commit }, name) {
    commit('updateStep', name)
  },
  updateNumber({ commit }, number = '') {
    commit('updateNumber', number)
  },
  updateSize({ commit }, size = '') {
    commit('updateSize', size)
  },
  updateTeam({ commit }, team = null) {
    commit('updateTeam', team)
  },
}
