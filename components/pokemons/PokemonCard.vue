<template>
  <div>
    <div v-if="noLink">
      <nuxt-img
        format="webp"
        preload
        :src="pokemon.sprite"
        :alt="`default picture of ${pokemon.name} pokemon`"
        class="card__image"
      />
      <p class="card__title">{{ pokemon.name }}</p>
      <button
        v-if="withDelete"
        class="button button--secondary"
        @click="$emit('delete')"
      >
        Delete
      </button>
    </div>
    <nuxt-link
      v-else
      :to="`/pokemon/${pokemon.id}`"
      class="card"
      :class="cardClass"
    >
      <nuxt-img
        format="webp"
        preload
        :src="pokemon.sprite"
        :alt="`default picture of ${pokemon.name} pokemon`"
        class="card__image"
      />
      <p class="card__title">{{ pokemon.name }}</p>
      <button
        v-if="withDelete"
        class="button button--secondary"
        @click="$emit('delete')"
      >
        Delete
      </button>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    withDelete: {
      type: Boolean,
      default: false,
    },
    noLink: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    cardClass() {
      return this.mode === 'dark' ? 'card--dark' : ''
    },
  },
}
</script>
