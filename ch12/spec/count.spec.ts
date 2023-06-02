import { TestScheduler } from "rxjs/testing";
import { counterPipe } from "../src/sum";
import { assert } from "chai";
import { delay, of } from "rxjs";
import { searchRepo2$ } from "../src/search";

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

  it("searchRepo2$ with custom due time", () => {
    scheduler.run(({ hot, expectObservable }) => {
      const keyup = "   ^-a-b---c-----|";
      const expected = "------x---y---|";
      const mockApi = {
        r: "react",
        rx: "rx",
        rxj: "rxjs",
      };
      const fetch$ = (query: string) => {
        return of(mockApi[query as keyof typeof mockApi]);
      };

      const keyup$ = hot(keyup, {
        a: { target: { value: "r" } },
        b: { target: { value: "rx" } },
        c: { target: { value: "rxj" } },
      });

      const result$ = searchRepo2$(keyup$, fetch$, 2, scheduler);

      expectObservable(result$).toBe(expected, {
        x: mockApi["rx"],
        y: mockApi["rxj"],
      })
    });
  });

  it("searchRepo2$ with delay response", () => {
    scheduler.run(({ hot, expectObservable }) => {
      const keyup = "   ^-a-b---c-----|";
      const expected = "--------x---y-|";
      const mockApi = {
        r: "react",
        rx: "rx",
        rxj: "rxjs",
      };
      const fetch$ = (query: string) => {
        return of(mockApi[query as keyof typeof mockApi]).pipe(delay(4, scheduler));
      };

      const keyup$ = hot(keyup, {
        a: { target: { value: "r" } },
        b: { target: { value: "rx" } },
        c: { target: { value: "rxj" } },
      });

      const result$ = searchRepo2$(keyup$, fetch$, 0, scheduler);

      expectObservable(result$).toBe(expected, {
        x: mockApi["rx"],
        y: mockApi["rxj"],
      })
    });
  });
});
