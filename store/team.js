export const state = () => ({
  team: [],
})

export const getters = {
  team: (state) => state.team,
}

export const mutations = {
  SET_TEAM: (state, team) => {
    state.team = team
  },
}

export const actions = {
  setTeamIfExist({ commit }, { localForage }) {
    return new Promise((resolve, reject) => {
      localForage.getItem('team').then((teamStored) => {
        if (teamStored) {
          commit('SET_TEAM', JSON.parse(teamStored))
        }
      })
    })
  },
}
