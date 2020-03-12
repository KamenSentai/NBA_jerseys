export default {
  updateStep({ commit }, name) {
    commit('updateStep', name)
  },
  updateName({ commit }, name = '') {
    commit('updateName', name)
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
