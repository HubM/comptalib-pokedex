<template>
  <section>
    <div v-if="pokemons.length">
      <input-search
        class="margin--bottom--m"
        placeholder="Search a pokemon"
        @search="searchPokemon"
        @restore-default-pokemons="restoreDefaultPokemons"
      />
      <flex-container tag="ul" no-gutter>
        <flex-item
          v-for="(pokemon, index) in pokemons"
          :key="index"
          xs6
          s4
          m3
          l2
        >
          <pokemon-card :pokemon="pokemon" />
        </flex-item>
      </flex-container>
    </div>
    <p v-else>No pokemons to catch &#x1F62B;</p>
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
