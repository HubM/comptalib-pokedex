import { getTeam, setTeam } from '~/helpers/functions/localForage'

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
  setTeamIfExist({ commit }, localForage) {
    return new Promise((resolve, reject) => {
      getTeam(localForage)
        .then((team) => {
          if (team) {
            commit('SET_TEAM', team)
            resolve()
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  addPokemon({ dispatch }, { localForage, pokemon }) {
    return new Promise((resolve, reject) => {
      getTeam(localForage)
        .then((team) => {
          let teamToAdd = [pokemon]

          if (team) {
            team.push(pokemon)
            teamToAdd = team
          }

          setTeam(localForage, teamToAdd)
            .then(() =>
              dispatch('setTeamIfExist', localForage).then(() => resolve())
            )
            .catch((error) => {
              reject(error)
            })
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
