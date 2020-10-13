import "babel-polyfill"

import { createAction, createAsync, createInstance } from "../src"

describe("createInstance", () => {
  it("should create store instance", () => {
    const instance = createInstance(0)

    expect(instance.getState).toBeTruthy()
    expect(instance.reset).toBeTruthy()
    expect(instance.subscribe).toBeTruthy()
    expect(instance.add).toBeTruthy()
  })

  it("getState return initial state on start", () => {
    const initialState = 0

    const instance = createInstance(initialState)

    expect(instance.getState()).toEqual(initialState)
  })
})

describe("createAction", () => {
  it("should create action", () => {
    const action = createAction()

    expect(action).toBeTruthy()
  })
})

describe("createAsync", () => {
  it("should create async action", () => {
    const async = createAsync(() => {})

    expect(async.pending).toBeTruthy()
    expect(async.done).toBeTruthy()
    expect(async.fail).toBeTruthy()
  })
})

describe("each use case", () => {
  it("store change state after event trigger", () => {
    const newState = 1

    const action = createAction()

    const instance = createInstance(0).add(action, () => newState)

    action()

    expect(instance.getState()).toEqual(newState)
  })

  it("store change state after multiply event triggers", () => {
    const firstTriggeredParam = 1
    const lastTriggeredState = 2

    const action = createAction()

    const instance = createInstance(0).add(action, (_, params) => params)

    action(firstTriggeredParam)
    expect(instance.getState()).toEqual(firstTriggeredParam)

    action(lastTriggeredState)
    expect(instance.getState()).toEqual(lastTriggeredState)
  })

  it("cb on add trigger after event call", () => {
    const cb = jest.fn()
    cb.mockReturnValue(10)

    const action = createAction()

    createInstance(0).add(action, cb)

    action()

    expect(cb).toHaveBeenCalled()
  })

  it("cb on add trigger multiply times after event call", () => {
    const callTimes = 10

    const cb = jest.fn()
    cb.mockReturnValue(10)

    const action = createAction()

    createInstance(0).add(action, cb)

    new Array(callTimes).fill(0).forEach(action)

    expect(cb.mock.calls.length).toEqual(callTimes)
  })

  it("pass params from action to store", () => {
    const param = 123

    const action = createAction()

    const instance = createInstance(0).add(action, (_, param) => param)

    action(param)

    expect(instance.getState()).toEqual(param)
  })

  it("reset fn reset the value of store", () => {
    const initialValue = 123

    const action = createAction()
    const reset = createAction()

    const instance = createInstance(initialValue)
      .add(action, (_, value) => value)
      .reset(reset)

    action("some value")

    expect(instance.getState()).not.toEqual(initialValue)

    reset()

    expect(instance.getState()).toEqual(initialValue)
  })
})
