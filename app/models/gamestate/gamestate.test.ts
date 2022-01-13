import { GamestateModel } from "./gamestate"

test("can be created", () => {
  const instance = GamestateModel.create({})

  expect(instance).toBeTruthy()
})
