<template>
  <input
    v-model.trim="search"
    type="text"
    aria-label="Button for searching a pokemon"
    class="input-search"
    :class="activeClass"
    :placeholder="placeholder"
    @change="onChange"
  />
</template>

<script>
export default {
  name: 'InputSearch',
  props: {
    placeholder: {
      type: String,
      default: 'Search a pokemon',
    },
    pokemons: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      search: '',
      debounce: null,
    }
  },
  computed: {
    active() {
      return this.search.length >= 2
    },
    activeClass() {
      if (!this.active) {
        return
      }

      return 'input-search--active'
    },
  },
  methods: {
    onChange() {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.$emit('restore-default-pokemons')
        if (!this.active) {
          return
        }

        const formattedSearch = this.search.trim().toLowerCase()
        this.$emit('search', formattedSearch)
      }, 800)
    },
  },
}
</script>
