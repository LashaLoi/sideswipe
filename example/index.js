import { createInstance, createAction, createAsync } from "../index"

const countAsync = createAsync(() => new Promise(res => setTimeout(() => res(), 2000)))

const increment = createAction()

const loadingInstance = createInstance(false)
  .add(countAsync.pending, () => true)
  .reset(countAsync.done)
  .reset(countAsync.fail)

const countInstance = createInstance(0)
  .add(increment, state => state + 1)
  .add(countAsync.done, () => 10)

// countInstance.subscribe(console.log)
;(async () => {
  console.log(loadingInstance.getState())

  await countAsync()
  console.log(loadingInstance.getState())

  increment()
  console.log(loadingInstance.getState())
  increment()

  console.log(countInstance.getState())
})()
