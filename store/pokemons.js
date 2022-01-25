// const eachSeries = require('async/eachSeries')

export const state = () => ({
  pokemons: [],
})

export const getters = {
  pokemons: (state) => state.pokemons,
}

export const mutations = {
  ADD_POKEMONS(state, pokemons) {
    state.pokemons = pokemons
  },
}

export const actions = {
  getPokemons({ commit }, payload = { limit: 100 }) {
    return new Promise((resolve, reject) => {
      const { API_URL } = this.app.$config
      const pokemonPromises = []
      const tmpPokemons = []

      for (let i = 1; i <= payload.limit; i++) {
        const url = `${API_URL}/pokemon/${i}`
        pokemonPromises.push(this.$axios.get(url))
      }

      Promise.all(pokemonPromises)
        .then((responses) => {
          responses.forEach((response) => {
            tmpPokemons.push(response.data)
          })
          commit('ADD_POKEMONS', tmpPokemons)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
