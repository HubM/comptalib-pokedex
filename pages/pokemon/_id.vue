<template>
  <flex-container tag="section" class="pokemon" no-gutter>
    <flex-item xs12 s6 class="pokemon__sprites">
      <pokemon-images :sprites="pokemon.sprites" />
    </flex-item>
    <flex-item xs12 s6 class="center-xs top-xs pokemon__details">
      <h1 v-if="pokemon.name" class="pokemon__details__name">
        {{ pokemon.name }}
      </h1>
      <button class="button button--primary" @click="onAddPokemon">
        Add to my team &#x1F918;
      </button>
      <div class="pokemon__details__informations">
        <h2 class="pokemon__details__informations__title">Characteristics</h2>
        <ul>
          <li v-if="pokemonHeight">Height : {{ pokemonHeight }}</li>
          <li v-if="pokemonWeight">Weight : {{ pokemonWeight }}</li>
        </ul>
        <h2
          v-if="pokemon.abilities"
          class="pokemon__details__informations__title"
        >
          abilities
        </h2>
        <ul>
          <li
            v-for="({ name, effect }, index) in pokemon.abilities"
            :key="`${name}-${index}`"
          >
            <h3 v-if="name">{{ name }}</h3>
            <p v-if="effect">{{ effect }}</p>
          </li>
        </ul>
      </div>
    </flex-item>
  </flex-container>
</template>

<script>
import { mapActions } from 'vuex'
import { formatPokemonCard } from '~/helpers/functions/format/pokemon'

export default {
  async asyncData({ params, store }) {
    const { id } = params
    let pokemon = null
    let abilities = null

    if (!store.state.pokemons.defaultPokemons.length) {
      pokemon = await store.dispatch('pokemon/getPokemon', id)
    } else {
      const findInStore = store.state.pokemons.defaultPokemons.find(
        (pokemon) => pokemon.id === id
      )

      if (findInStore) {
        pokemon = findInStore
      } else {
        pokemon = await store.dispatch('pokemon/getPokemon', id)
      }
    }

    if (pokemon.abilities.length) {
      abilities = await store.dispatch(
        'pokemon/getPokemonAbilities',
        pokemon.abilities
      )
    }

    return {
      pokemon: {
        ...pokemon,
        abilities,
      },
    }
  },
  head() {
    return {
      title: `${this.pokemon.name.toUpperCase()}`,
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
  methods: {
    ...mapActions({
      addPokemon: 'team/addPokemon',
    }),
    onAddPokemon() {
      this.addPokemon({
        localForage: this.$localForage,
        pokemon: formatPokemonCard(this.pokemon),
      })
        .then(() => {
          alert('Pokemon added to your team !')
        })
        .catch(() => {
          alert(
            'An error occured while adding the pokemon to your team, please try again later.'
          )
        })
    },
  },
}
</script>
