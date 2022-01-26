export default function (pokemon) {
  const { id, name, weight, sprites, stats, types } = pokemon
  return {
    id,
    name,
    weight,
    sprites: {
      default: {
        front: sprites.front_default || null,
        back: sprites.back || null,
      },
      shiny: {
        front: sprites.front_default || null,
        back: sprites.back || null,
      },
    },
    stats: stats.map(({ stat }) => stat),
    types: types.map(({ type }) => type),
  }
}
