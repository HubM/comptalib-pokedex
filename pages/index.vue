<template>
  <section>
    <div>
      <input-search
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
  async fetch({ store, $localForage }) {
    await store.dispatch('pokemons/getPokemons')
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
