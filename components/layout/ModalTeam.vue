<template>
  <div class="modal">
    <div class="modal__content">
      <h1>My team</h1>
      <ul v-if="team.length">
        <li v-for="(pokemon, index) in team" :key="`${pokemon.name}-${index}`">
          <pokemon-card :pokemon="pokemon" />
        </li>
      </ul>
      <p v-else>No pokemons in my team &#x1F62B;</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalTeam',
  props: {
    team: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
