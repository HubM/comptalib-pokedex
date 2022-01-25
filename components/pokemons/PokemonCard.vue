<template>
  <nuxt-link :to="`/pokemon/${pokemon.id}`" class="card">
    <nuxt-img
      preload
      :src="pokemon.sprites.front_default"
      :alt="`default picture of ${pokemon.name} pokemon`"
      class="card__image"
    />
    <p class="card__title">{{ pokemon.name }}</p>
  </nuxt-link>
</template>

<script>
export default {
  name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
}
</script>
