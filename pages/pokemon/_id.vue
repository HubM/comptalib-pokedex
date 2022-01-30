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
        <div class="pokemon__details__informations__section">
          <h2 class="pokemon__details__informations__title">Characteristics</h2>
          <ul class="list-classic">
            <li>
              <p v-if="pokemon.isBaby" class="margin-null">Baby &#x1F476;</p>
              <p v-else class="margin-null">Adult &#x1F9D4;</p>
            </li>
            <li v-if="pokemonHeight">{{ pokemonHeight }} &#x1F4CB;</li>
            <li v-if="pokemonWeight">{{ pokemonWeight }} &#x1F4CB;</li>
            <li v-if="pokemon.isLegendary">Legendary pokemon &#x1F947;</li>
            <li v-if="pokemon.isMythical">Mythical pokemon &#x1F396;</li>
            <li v-if="pokemon.happiness" v-html="pokemonHappiness" />
          </ul>
        </div>
        <div
          v-if="pokemon.abilities"
          class="pokemon__details__informations__section"
        >
          <h2 class="pokemon__details__informations__title">Abilities</h2>
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
        <div
          v-if="pokemon.evolution.length && pokemon.evolution.length > 1"
          class="pokemon__details__informations__section"
        >
          <h2 class="pokemon__details__informations__title">Evolution</h2>
          <flex-container
            v-if="pokemon.evolution.length > 1"
            class="center-xs start-s"
          >
            <flex-item
              v-for="(evolution, index) in pokemon.evolution"
              :key="`${evolution.name}-${index}`"
            >
              <flex-container class="middle-xs">
                <flex-item v-if="evolution.id !== pokemon.id" tag="p">
                  <nuxt-link :to="`/pokemon/${evolution.id}`">
                    {{ evolution.name }}
                  </nuxt-link>
                </flex-item>
                <flex-item v-else tag="p" class="current">
                  {{ evolution.name }}
                </flex-item>
                <flex-item
                  v-if="index !== pokemon.evolution.length - 1"
                  tag="span"
                >
                  &#8594;
                </flex-item>
              </flex-container>
            </flex-item>
          </flex-container>
        </div>
      </div>
    </flex-item>
  </flex-container>
</template>

<script>
import { mapActions } from 'vuex'
import FlexContainer from '~/components/layout/grid/FlexContainer.vue'
import FlexItem from '~/components/layout/grid/FlexItem.vue'
import { formatPokemonCard } from '~/helpers/functions/format/pokemon'

export default {
  components: { FlexContainer, FlexItem },
  async asyncData({ params, store }) {
    const { id } = params

    const pokemon = await store.dispatch('pokemon/getPokemon', id)

    if (pokemon.species) {
      Object.assign(
        pokemon,
        await store.dispatch('pokemon/getPokemonSpecies', pokemon.species)
      )
    }

    if (pokemon.abilities?.length) {
      pokemon.abilities = await store.dispatch(
        'pokemon/getPokemonAbilities',
        pokemon.abilities
      )
    }

    if (pokemon.evolutionUrl) {
      pokemon.evolution = await store.dispatch(
        'pokemon/getPokemonEvolution',
        pokemon.evolutionUrl
      )
      delete pokemon.evolutionUrl
    }

    return {
      pokemon,
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

      if (this.pokemon.height < 10) {
        return `${this.pokemon.height * 10} cm`
      }

      return `${this.pokemon.height / 10} m`
    },
    pokemonWeight() {
      if (!this.pokemon.weight) return null
      return `${this.pokemon.weight / 10} kg`
    },

    pokemonHappiness() {
      const { happiness } = this.pokemon

      if (happiness > 0 && happiness <= 42) {
        return `This pokemon is depressed &#x1F62D;`
      }

      if (happiness > 42 && happiness <= 84) {
        return `This pokemon is sad &#x1F61E;`
      }

      if (happiness > 84 && happiness <= 127) {
        return `This pokemon is neutral &#x1F610;`
      }

      if (happiness > 127 && happiness <= 170) {
        return `This pokemon is positive &#x1F642;`
      }

      if (happiness > 170 && happiness <= 210) {
        return `This pokemon is happy &#x1F604;`
      }

      return `This pokemon is euphoric &#x1F92A;`
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
