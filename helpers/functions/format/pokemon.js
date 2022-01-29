/* eslint-disable camelcase */
import { getVersionSprites, capitalize } from './helpers'

/* data for pokemon card */
export function formatPokemonCard({ id, name, sprites }) {
  return {
    id,
    name: capitalize(name),
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
  species,
}) {
  const versions = Object.keys(sprites.versions).length
    ? getVersionSprites(sprites.versions)
    : []
  return {
    id,
    name: capitalize(name) || 'Pokemon without name',
    height: height || null,
    weight: weight || null,
    sprites: {
      default: sprites.front_default || null,
      versions,
    },
    abilities: abilities.map(({ ability }) => ability),
    species,
  }
}

/* data for pokemon abilities */
export function formatPokemonAbilities({ name, effect_entries = [] }) {
  const { effect } = effect_entries.find(
    ({ language }) => language.name === 'en'
  )

  return {
    name: capitalize(name).replace('-', ' '),
    effect,
  }
}

export function formatPokemonSpecies({
  evolution_chain,
  is_baby,
  is_legendary,
  is_mythical,
  habitat,
  base_happiness,
  capture_rate,
}) {
  return {
    evolutionUrl: evolution_chain?.url || null,
    happiness: base_happiness,
    captureRate: capture_rate,
    isBaby: is_baby || false,
    isLegendary: is_legendary || false,
    isMythical: is_mythical || false,
    habitat: capitalize(habitat.name) || null,
  }
}

let evolutionArray

const getEvolutionItems = (chain) => {
  const urlArray = chain.species.url?.split('/').filter((i) => i)
  const id = Number(urlArray[urlArray.length - 1])

  evolutionArray.push({
    name: capitalize(chain.species.name),
    id,
  })

  if (chain.evolves_to.length) {
    return getEvolutionItems(chain.evolves_to[0])
  }

  return evolutionArray
}

export function formatPokemonEvolution({ chain }) {
  evolutionArray = []
  return getEvolutionItems(chain)
}
