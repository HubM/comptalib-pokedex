import formatPokemon from '~/helpers/functions/formatPokemon'

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
  getPokemons({ commit, state }, payload = { limit: 20 }) {
    return new Promise((resolve, reject) => {
      commit('SET_LOADING', true)

      const { API_URL } = this.app.$config
      const pokemonPromises = []

      for (let i = 1; i <= payload.limit; i++) {
        const url = `${API_URL}/pokemon/${i}`
        pokemonPromises.push(this.$axios.get(url))
      }

      Promise.all(pokemonPromises)
        .then((responses) => {
          const pokemons = responses.map((response) =>
            formatPokemon(response.data)
          )
          commit('ADD_POKEMONS', pokemons)
        })
        .finally(() => {
          commit('SET_LOADING', false)
          resolve()
        })
    })
  },
  searchPokemon({ commit, state }, search) {
    const pokemons = state.pokemons.filter((pokemon) =>
      new RegExp(search, 'i').test(pokemon.name)
    )
    commit('FILTER_POKEMONS', pokemons)
  },
  restoreDefaultPokemons({ commit }) {
    return new Promise((resolve, reject) => {
      commit('RESTORE_DEFAULT_POKEMONS')
    })
  },
}
