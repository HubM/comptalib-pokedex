/* eslint-disable camelcase */
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

/* data for pokemon card */
export function formatPokemonCard({ id, name, sprites }) {
  return {
    id,
    name,
    sprite: sprites.default,
  }
}

/* data for pokemon details */
export function formatPokemonDetails({
  id,
  name,
  height,
  weight,
  sprites,
  abilities,
  stats,
  types,
}) {
  const versions = Object.keys(sprites.versions).length
    ? getVersionSprites(sprites.versions)
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
    abilities: abilities.map(({ ability }) => ability),
    stats: stats.map(({ stat }) => stat),
    types: types.map(({ type }) => type),
  }
}

/* data for pokemon abilities */
export function formatPokemonAbilities({ name, effect_entries = [] }) {
  const { effect } = effect_entries.find(
    ({ language }) => language.name === 'en'
  )

  return {
    name,
    effect,
  }
}
