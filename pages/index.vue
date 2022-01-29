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
    <div ref="morePokemons" />
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NuxtSSRScreenSize from 'nuxt-ssr-screen-size'

export default {
  name: 'IndexPage',
  mixins: [NuxtSSRScreenSize.NuxtSSRScreenSizeMixin],
  data() {
    return {
      observer: null,
      maxPokemons: 0,
    }
  },
  async fetch() {
    await this.calculateMaxPokemons()
    await this.$store.dispatch('pokemons/getPokemons', this.maxPokemons)
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
  mounted() {
    this.observer = new IntersectionObserver(this.onElementInViewport, {
      // root: this.$refs.morePokemons,
      rootMargin: '0px',
      threshold: 0.5,
    })

    this.observer.observe(this.$refs.morePokemons)
  },
  beforeDestroy() {
    this.observer.disconnect()
  },
  methods: {
    ...mapActions({
      getPokemons: 'pokemons/getPokemons',
      searchPokemon: 'pokemons/searchPokemon',
      restoreDefaultPokemons: 'pokemons/restoreDefaultPokemons',
    }),
    onElementInViewport(entries) {
      console.log(entries)
      // entries.forEach(({ target, isIntersecting }) => {
      //   if (!isIntersecting) {
      //     return
      //   }
      //   this.observer.unobserve(target)
      //   setTimeout(() => {
      //     // const i = target.getAttribute('data-index')
      //     // this.todos[i].seen = true
      //     console.log('IVE SEEN U')
      //   }, 1000)
      //   console.log(target, isIntersecting)
      //   // do something ...
      // })
    },
    calculateMaxPokemons() {
      return new Promise((resolve) => {
        const { $vssWidth, $vssHeight } = this
        const cardHeight = 150
        const rows = Math.ceil($vssHeight / cardHeight)
        let columns = 2

        if ($vssWidth > 480) {
          columns = 3
        } else if ($vssWidth > 992) {
          columns = 4
        } else if ($vssWidth > 1200) {
          columns = 6
        }

        this.maxPokemons = rows * columns

        resolve()
      })
    },
  },
}
</script>
