<template>
  <flex-container tag="section" class="pokemon" no-gutter>
    <flex-item xs12 s6 class="pokemon__sprites">
      <pokemon-images :sprites="pokemon.sprites" />
    </flex-item>
    <flex-item xs12 s6 class="center-xs top-xs pokemon__details">
      <h1 v-if="pokemon.name" class="pokemon__details__name">
        {{ pokemon.name }}
      </h1>
      <div class="pokemon__details__informations">
        <h2 class="pokemon__details__informations__title">Characteristics</h2>
        <ul>
          <li v-if="pokemonHeight">Height : {{ pokemonHeight }}</li>
          <li v-if="pokemonWeight">Weight : {{ pokemonWeight }}</li>
        </ul>
      </div>
    </flex-item>
  </flex-container>
</template>

<script>
export default {
  async asyncData({ params, store }) {
    const { id } = params
    let pokemon = null

    if (!store.state.pokemons.defaultPokemons.length) {
      pokemon = await store.dispatch('pokemons/getPokemon', id)
    } else {
      const findInStore = store.state.pokemons.defaultPokemons.find(
        (pokemon) => pokemon.id === id
      )

      if (findInStore) {
        pokemon = findInStore
      } else {
        pokemon = await store.dispatch('pokemons/getPokemon', id)
      }
    }

    return {
      pokemon,
    }
  },
  computed: {
    pokemonHeight() {
      if (!this.pokemon.height) return null
      return `${this.pokemon.height * 100} cm`
    },
    pokemonWeight() {
      if (!this.pokemon.weight) return null
      return `${this.pokemon.weight / 10} kg`
    },
  },
}
</script>
