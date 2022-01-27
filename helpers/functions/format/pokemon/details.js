function getVersionSprites(versions) {
  const allowedVersions = ['red-blue', 'yellow', 'crystal', 'gold', 'silver']
  return Object.values(versions).reduce((acc, version) => {
    Object.entries(version).forEach(([key, value]) => {
      if (allowedVersions.includes(key) && value.front_default) {
        acc.push({ name: key, sprite: value.front_default })
      }
    })
    return acc
  }, [])
}

export default function (pokemon) {
  const { id, name, height, weight, sprites, stats, types } = pokemon

  const versions = Object.keys(pokemon.sprites.versions).length
    ? getVersionSprites(pokemon.sprites.versions)
    : []

  return {
    id,
    name: name || 'pokemon without name',
    height: height || null,
    weight: weight || null,
    sprites: {
      default: sprites.front_default || null,
      versions,
    },
    stats: stats.map(({ stat }) => stat),
    types: types.map(({ type }) => type),
  }
}
