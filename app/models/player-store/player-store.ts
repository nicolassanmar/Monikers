import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { GamestateModel } from "../gamestate/gamestate"
import { PlayerModel } from "../player/player"

/**
 * Model description here for TypeScript hints.
 */

const shuffleArray = (array) => {
  const resArray: string[] = [...array]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = resArray[i]
    resArray[i] = resArray[j]
    resArray[j] = temp
  }
  return resArray
}

export const PlayerStoreModel = types
  .model({
    players: types.optional(types.array(PlayerModel), []),
    team1: types.optional(types.array(types.string), []),
    team2: types.optional(types.array(types.string), []),
    game: types.optional(GamestateModel, { numberOfWords: 8, multiplayer: false }),
  })
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    addPlayer(name: string) {
      self.players.push(PlayerModel.create({ name }))
    },
    clearPlayers() {
      self.players.clear()
    },
    setTeams(team1, team2) {
      self.team1 = team1
      self.team2 = team2
    },
    createGame(numberOfWords, multiplayer, randomOrder) {
      self.game = GamestateModel.create({
        numberOfWords,
        multiplayer: false,
      })
      if (randomOrder) {
        self.team1 = shuffleArray(self.team1)
        self.team2 = shuffleArray(self.team2)
      }
    },
    setWords(player, words) {
      self.players.at(self.players.indexOf(player)).words = words
    },
  }))

type PlayerStoreType = Instance<typeof PlayerStoreModel>
export interface PlayerStore extends PlayerStoreType {}
type PlayerStoreSnapshotType = SnapshotOut<typeof PlayerStoreModel>
export interface PlayerStoreSnapshot extends PlayerStoreSnapshotType {}
export const createPlayerStoreDefaultModel = () => types.optional(PlayerStoreModel, {})
