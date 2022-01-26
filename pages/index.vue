<template>
  <section>
    <loader-list v-if="loading" />
    <div v-else>
      <input-search
        class="margin--bottom--m"
        placeholder="Search a pokemon"
        @search="searchPokemon"
        @restore-default-pokemons="restoreDefaultPokemons"
      />
      <flex-container v-if="pokemons && pokemons.length" tag="ul" no-gutter>
        <flex-item v-for="(pokemon, index) in pokemons" :key="index" xs6 s4 m3>
          <pokemon-card :pokemon="pokemon" />
        </flex-item>
      </flex-container>
      <p v-else>No pokemons to catch :(</p>
    </div>
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
