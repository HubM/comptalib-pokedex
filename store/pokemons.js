import {
  formatPokemonCard,
  formatPokemonDetails,
} from '~/helpers/functions/format/pokemon'

export const state = () => ({
  pokemons: [],
  defaultPokemons: [],
  infiniteScroll: false,
})

export const getters = {
  pokemons: (state) => state.pokemons,
  infiniteScroll: (state) => state.infiniteScroll,
}

export const mutations = {
  ADD_POKEMONS(state, pokemons) {
    const pokemonsToAdd = pokemons.map((pokemon) => formatPokemonCard(pokemon))

    if (state.pokemons.length) {
      state.pokemons = [...state.pokemons, ...pokemonsToAdd]
      state.defaultPokemons = [...state.pokemons, ...pokemonsToAdd]
      return
    }

    state.pokemons = pokemonsToAdd
    state.defaultPokemons = pokemonsToAdd
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
  SET_INFINITE_SCROLL(state, infiniteScroll) {
    state.infiniteScroll = infiniteScroll
  },
}

export const actions = {
  getPokemons({ commit, state }, { maxPokemons }) {
    return new Promise((resolve, reject) => {
      const { API_URL } = this.app.$config
      const pokemonPromises = []
      const offset = state.pokemons.length

      for (let i = 1; i <= maxPokemons; i++) {
        const url = `${API_URL}/pokemon/${i + offset}`
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
  searchPokemon({ commit, dispatch, state }, search) {
    dispatch('setInfiniteScroll', false)
    const pokemons = state.pokemons.filter((pokemon) =>
      new RegExp(search, 'i').test(pokemon.name)
    )
    commit('FILTER_POKEMONS', pokemons)
  },
  restoreDefaultPokemons({ commit, dispatch }) {
    commit('RESTORE_DEFAULT_POKEMONS')
    dispatch('setInfiniteScroll', true)
  },
  setInfiniteScroll({ commit }, infiniteScroll) {
    commit('SET_INFINITE_SCROLL', infiniteScroll)
  },
}
