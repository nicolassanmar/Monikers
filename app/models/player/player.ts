import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const PlayerModel = types
  .model({
    name: types.identifier,
  })
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type PlayerType = Instance<typeof PlayerModel>
export interface Player extends PlayerType {}
type PlayerSnapshotType = SnapshotOut<typeof PlayerModel>
export interface PlayerSnapshot extends PlayerSnapshotType {}
export const createPlayerDefaultModel = () => types.optional(PlayerModel, {})
