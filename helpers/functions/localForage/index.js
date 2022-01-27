export function getTeam(localForage) {
  return new Promise((resolve, reject) => {
    localForage.getItem('team').then((teamStored) => {
      if (teamStored) {
        resolve(JSON.parse(teamStored))
        return
      }
      resolve()
    })
  })
}

export function setTeam(localForage, team) {
  return new Promise((resolve, reject) => {
    localForage
      .setItem('team', JSON.stringify(team))
      .then(() => resolve())
      .catch((error) => reject(error))
  })
}
