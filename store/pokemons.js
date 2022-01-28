import {
  formatPokemonCard,
  formatPokemonDetails,
  formatPokemonAbilities,
} from '~/helpers/functions/format/pokemon'

export const state = () => ({
  pokemons: [],
  defaultPokemons: [],
})

export const getters = {
  pokemons: (state) => state.pokemons,
}

export const mutations = {
  ADD_POKEMONS(state, pokemons) {
    state.pokemons = pokemons.map((pokemon) => formatPokemonCard(pokemon))
    state.defaultPokemons = pokemons
  },
  FILTER_POKEMONS(state, pokemons) {
    state.pokemons = pokemons
  },
  RESTORE_DEFAULT_POKEMONS(state) {
    state.pokemons = state.defaultPokemons.map((pokemon) =>
      formatPokemonCard(pokemon)
    )
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
}

export const actions = {
  getPokemons({ commit, state }, payload = { limit: 100 }) {
    return new Promise((resolve, reject) => {
      if (state.pokemons.length) {
        resolve()
        return
      }

      const { API_URL } = this.app.$config
      const pokemonPromises = []

      for (let i = 1; i <= payload.limit; i++) {
        const url = `${API_URL}/pokemon/${i}`
        pokemonPromises.push(this.$axios.get(url))
      }

      Promise.all(pokemonPromises)
        .then((responses) => {
          const pokemons = responses.map(({ data }) =>
            formatPokemonDetails(data)
          )
          commit('ADD_POKEMONS', pokemons)
        })
        .finally(() => resolve())
    })
  },
  searchPokemon({ commit, state, getters }, search) {
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
  getPokemon({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      const { API_URL } = this.app.$config
      const url = `${API_URL}/pokemon/${id}`

      this.$axios
        .get(url)
        .then(({ data }) => resolve(formatPokemonDetails(data)))
    })
  },
  getPokemonAbilities({ commit, state }, abilities) {
    return new Promise((resolve, reject) => {
      const promises = abilities.map(({ url }) => this.$axios.get(url))

      Promise.all(promises).then((responses) => {
        const abilities = responses.map(({ data }) =>
          formatPokemonAbilities(data)
        )
        resolve(abilities)
      })
    })
  },
}
