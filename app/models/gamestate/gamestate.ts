import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const GamestateModel = types
  .model({
    numberOfWords: types.number,
    multiplayer: types.boolean,
    words: types.optional(types.array(types.string), []),
  })
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type GamestateType = Instance<typeof GamestateModel>
export interface Gamestate extends GamestateType {}
type GamestateSnapshotType = SnapshotOut<typeof GamestateModel>
export interface GamestateSnapshot extends GamestateSnapshotType {}
export const createGamestateDefaultModel = () => types.optional(GamestateModel, {})
