<template>
  <div>
    <flex-container
      v-if="pokemons.length"
      class="pokemon-list"
      tag="ul"
      no-gutter
    >
      <flex-item v-for="(pokemon, index) in pokemons" :key="index" xs6 s4 m3 l2>
        <pokemon-card
          :pokemon="pokemon"
          :mode="mode"
          :with-delete="withDelete"
          @delete="$emit('delete', index)"
        />
      </flex-item>
    </flex-container>
    <p v-else class="text-center">
      <span class="text-italic">{{ emptyMessage }}</span> &#x1F62B;
    </p>
  </div>
</template>

<script>
export default {
  name: 'PokemonList',
  props: {
    pokemons: {
      type: Array,
      default: () => [],
    },
    emptyMessage: {
      type: String,
      default: 'No pokemons to catch',
    },
    mode: {
      type: String,
      default: 'dark',
    },
    withDelete: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
