<template>
  <div class="modal">
    <div class="modal__content">
      <h1>My team</h1>
      <pokemon-list
        :pokemons="team"
        empty-message="No pokemons in my team"
        mode="light"
        with-delete
        @delete="(index) => $emit('delete', index)"
      />
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
