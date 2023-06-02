import { TestScheduler } from "rxjs/testing";
import { counterPipe } from "../src/sum";
import { assert } from "chai";

let scheduler: TestScheduler;

describe("Counter", () => {
  beforeEach(() => {
    scheduler = new TestScheduler(assert.deepEqual.bind(assert));
  });

  it("should add & subtract count on source", () => {
    scheduler.run(({ hot, expectObservable }) => {
      const plus = "    ^-a------|";
      const minus = "   ^---c-d--|";
      const expected = "^-x-y-z--|";

      const result$ = counterPipe(hot(plus), hot(minus));

      expectObservable(result$).toBe(expected, { x: 1, y: 0, z: -1 });
    });
  });
});
