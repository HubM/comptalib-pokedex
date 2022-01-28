<template>
  <section>
    <div v-if="$fetchState.error" class="error-section">
      <h1>Pokemons not found &#x1F62B;</h1>
      <p>An error occured while getting Pokemons, please try again later.</p>
    </div>
    <p v-else-if="$fetchState.pending">Loading pokemons...</p>
    <div v-else>
      <input-search
        v-if="pokemons.length"
        class="margin--bottom--m"
        placeholder="Search a pokemon"
        @search="searchPokemon"
        @restore-default-pokemons="restoreDefaultPokemons"
      />
      <pokemon-list :pokemons="pokemons" />
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'IndexPage',
  async fetch() {
    await this.$store.dispatch('pokemons/getPokemons')
  },
  head() {
    return {
      title: 'Catch them all !',
    }
  },
  computed: {
    ...mapGetters({
      pokemons: 'pokemons/pokemons',
      loading: 'pokemons/loading',
    }),
  },
  methods: {
    ...mapActions({
      getPokemons: 'pokemons/getPokemons',
      searchPokemon: 'pokemons/searchPokemon',
      restoreDefaultPokemons: 'pokemons/restoreDefaultPokemons',
    }),
  },
}
</script>
