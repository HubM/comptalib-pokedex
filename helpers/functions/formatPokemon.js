export default function (pokemon) {
  const { name, sprites } = pokemon
  return {
    name,
    sprite: sprites.front_default,
  }
}
