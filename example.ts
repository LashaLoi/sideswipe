import { createInstance, createAction, createAsync } from "./src"

export const increment = createAction<number>()
export const decrement = createAction<number>()

export const countAsync = createAsync<number>(() => new Promise(res => setTimeout(() => res(10), 2000)))

export const iloading = createInstance(false)
  .add(countAsync.pending, () => true)
  .reset(countAsync.done)
  .reset(countAsync.fail)

export const icount = createInstance<number>(0)
  .add(increment, state => state + 1)
  .add(decrement, state => state - 1)
  .add(countAsync.done, (_, value) => value as number)

icount.subscribe(console.log)
iloading.subscribe(console.log)

increment()
// {state: 1, params: undefined}

increment(1)
// {state: 2, params: 1}

decrement()
// {state: 1, params: undefined}
;(async () => {
  await countAsync()
  // {state: 10, params: 10}
})()
