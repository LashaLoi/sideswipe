import { createInstance, createAction, createAsync } from "./sideswipe";

const increment = createAction("increment");
const decrement = createAction("decrement");
const reset = createAction("reset");

const countAsync = createAsync(
  count => new Promise(res => setTimeout(() => res(count), 3000))
);

const { subscribe } = createInstance(0)
  .add(increment, state => state + 1)
  .add(decrement, state => state - 1)
  .add(countAsync.done, (_, value) => value)
  .reset(reset);

subscribe(console.log);

increment();
increment();
increment();
decrement();

(async () => {
  await countAsync(10);
})();
