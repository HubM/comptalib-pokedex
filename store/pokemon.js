import {
  formatPokemonDetails,
  formatPokemonAbilities,
} from '~/helpers/functions/format/pokemon'

export const actions = {
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
