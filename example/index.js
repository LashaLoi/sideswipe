import { createInstance, createAsync } from "../index"

const countAsync = createAsync(() => new Promise(res => setTimeout(() => res(), 2000)))

const loadingInstance = createInstance(true).add(countAsync.done, () => false)
const countInstance = createInstance(0).add(countAsync.done, () => 10)

;(async () => {
  await countAsync()

  console.log(loadingInstance.getState())
  console.log(countInstance.getState())
})()
