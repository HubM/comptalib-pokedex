<template>
  <section>
    <h1>Catch them all !</h1>
    <ul v-if="pokemons && pokemons.length">
      <li v-for="(pokemon, index) in pokemons" :key="index">
        <p>{{ pokemon.name }}</p>
      </li>
    </ul>
    <p v-else>No pokemons to catch :(</p>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'IndexPage',
  async fetch({ store }) {
    if (!store.getters['pokemons/pokemons'].length) {
      await store.dispatch('pokemons/getPokemons')
    }
  },
  computed: {
    ...mapGetters({
      pokemons: 'pokemons/pokemons',
    }),
  },

  methods: {
    ...mapActions({
      getPokemons: 'pokemons/getPokemons',
    }),
  },
}
</script>
