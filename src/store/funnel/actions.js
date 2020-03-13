export default {
  finalize({ commit }) {
    commit('finalize')
  },
  turn({ commit }, value = undefined) {
    commit('turn', value)
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
  updateStep({ commit }, name) {
    commit('updateStep', name)
  },
  updateTeam({ commit }, team = null) {
    commit('updateTeam', team)
  },
}
