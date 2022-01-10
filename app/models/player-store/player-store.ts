import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PlayerModel } from "../player/player"

/**
 * Model description here for TypeScript hints.
 */
export const PlayerStoreModel = types
  .model({
    players: types.optional(types.array(PlayerModel), []),
    team1: types.optional(types.array(types.string), []),
    team2: types.optional(types.array(types.string), []),
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
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type PlayerStoreType = Instance<typeof PlayerStoreModel>
export interface PlayerStore extends PlayerStoreType {}
type PlayerStoreSnapshotType = SnapshotOut<typeof PlayerStoreModel>
export interface PlayerStoreSnapshot extends PlayerStoreSnapshotType {}
export const createPlayerStoreDefaultModel = () => types.optional(PlayerStoreModel, {})
