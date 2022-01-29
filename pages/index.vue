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
      <pokemon-list
        :pokemons="pokemons"
        @hook:mounted="setInfiniteScrollonMounted"
      />
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
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.name === 'pokemon-id') {
        vm.$store.dispatch('pokemons/setInfiniteScroll', false)
      }
    })
  },
  data() {
    return {
      observer: null,
      maxPokemons: 0,
    }
  },
  async fetch() {
    await this.calculateMaxPokemons()
    if (!this.$store.state.pokemons.pokemons.length) {
      await this.$store.dispatch('pokemons/getPokemons', {
        maxPokemons: this.maxPokemons,
      })
    }
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
      infiniteScroll: 'pokemons/infiniteScroll',
    }),
  },
  mounted() {
    this.observer = new IntersectionObserver(this.onElementInViewport, {
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
      setInfiniteScroll: 'pokemons/setInfiniteScroll',
    }),
    onElementInViewport(entries) {
      entries.forEach(({ isIntersecting }) => {
        if (!isIntersecting || !this.infiniteScroll) return
        this.getPokemons({
          maxPokemons: this.maxPokemons,
        })
      })
    },
    calculateMaxPokemons() {
      return new Promise((resolve) => {
        const { $vssWidth, $vssHeight } = this
        const cardHeight = 150

        const totalScreenHeight = $vssHeight / 3 + $vssHeight

        const rows = Math.ceil(totalScreenHeight / cardHeight)
        let columns = 2

        if ($vssWidth > 480) {
          columns = 3
        } else if ($vssWidth > 992) {
          columns = 4
        } else if ($vssWidth > 1200) {
          columns = 6
        }

        this.maxPokemons = rows * columns * 2
        resolve()
      })
    },
    setInfiniteScrollonMounted() {
      this.setInfiniteScroll(true)
    },
  },
}
</script>
