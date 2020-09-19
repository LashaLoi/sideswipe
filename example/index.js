import { createInstance } from "../src/createInstance"
import { createAction } from "../src/createAction"
import { createAsync } from "../src/createAsync"

const countAsync = createAsync(() => new Promise(res => setTimeout(() => res(), 2000)))

const increment = createAction()

const countInstance = createInstance(0)
  .add(increment, state => state + 1)
  .add(countAsync.pending, () => "loading")
  .add(countAsync.done, () => 10)

// countInstance.subscribe(console.log)
;(async () => {
  console.log(countAsync.pending)

  await countAsync()

  increment()
  increment()

  console.log(countInstance.getState())
})()
