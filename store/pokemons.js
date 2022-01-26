import wait from '~/helpers/functions/wait'

export const state = () => ({
  pokemons: [],
  defaultPokemons: [],
  loading: false,
})

export const getters = {
  pokemons: (state) => state.pokemons,
  loading: (state) => state.loading,
}

export const mutations = {
  ADD_POKEMONS(state, pokemons) {
    state.pokemons = pokemons
    state.defaultPokemons = pokemons
  },
  FILTER_POKEMONS(state, pokemons) {
    state.pokemons = pokemons
  },
  RESTORE_DEFAULT_POKEMONS(state) {
    state.pokemons = state.defaultPokemons
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
}

export const actions = {
  getPokemons({ commit }, payload = { limit: 20 }) {
    return new Promise((resolve, reject) => {
      commit('SET_LOADING', true)

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
          wait().then(() => {
            commit('ADD_POKEMONS', tmpPokemons)
            commit('SET_LOADING', false)
            resolve()
          })
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  searchPokemon({ commit, state }, search) {
    return new Promise((resolve, reject) => {
      const filteredPokemons = state.pokemons.filter((pokemon) =>
        pokemon.name.includes(search)
      )
      commit('FILTER_POKEMONS', filteredPokemons)
    })
  },
  restoreDefaultPokemons({ commit }) {
    return new Promise((resolve, reject) => {
      commit('RESTORE_DEFAULT_POKEMONS')
    })
  },
}
