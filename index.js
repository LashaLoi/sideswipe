import { createInstance, createAction, createAsync } from "./sideswipe";

const increment = createAction("increment");
const decrement = createAction("decrement");
const reset = createAction("reset");

const countAsync = createAsync(
  count => new Promise(res => setTimeout(() => res(count), 3000))
);

const { subscribe } = createInstance(0)
  .add(countAsync.done, (_, value) => value)
  .add(increment, state => state + 1)
  .add(decrement, state => state - 1)
  .reset(reset);

subscribe(console.log);

increment();
// { state: 1, params: undefined }

increment();
// { state: 2, params: undefined }

increment();
// { state: 3, params: undefined }

decrement();
// { state: 2, params: undefined }

(async () => {
  await countAsync(10);
  // { state: 10, params: 10 }
})();
