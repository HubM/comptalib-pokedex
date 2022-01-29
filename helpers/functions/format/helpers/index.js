export function getVersionSprites(versions) {
  const allowedVersions = ['red-blue', 'yellow', 'crystal', 'gold', 'silver']
  return Object.values(versions).reduce((acc, version) => {
    Object.entries(version).forEach(([key, value]) => {
      if (allowedVersions.includes(key) && value.front_default) {
        acc.push({
          name: capitalize(key).replace('-', ' '),
          sprite: value.front_default,
        })
      }
    })
    return acc
  }, [])
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
