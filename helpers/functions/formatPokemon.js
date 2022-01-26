export default function (pokemon) {
  const { id, name, sprites } = pokemon
  return {
    id,
    name,
    sprite: sprites.front_default,
  }
}
