import { TestScheduler } from "rxjs/testing";
import { assert, expect } from "chai";
import {
  EMPTY,
  NEVER,
  concat,
  concatWith,
  interval,
  map,
  merge,
  take,
  throwError,
} from "rxjs";

let scheduler: TestScheduler;

// function shortcuts
const addDrama = (x: number | string) => x + "!";

describe("Observable", () => {
  beforeEach(() => {
    scheduler = new TestScheduler(assert.deepEqual.bind(assert));
  });

  it("should parse marble diagrams", () => {
    scheduler.run(({ expectObservable, cold }) => {
      const source = "  --a--b--|";
      const expected = "--a--b--|";

      const source$ = cold(source);

      expectObservable(source$).toBe(expected);
    });
  });

  it("should work with map operator", () => {
    scheduler.run(({ expectObservable, cold }) => {
      const expected = "-a-b|";
      const source$ = cold("-a-b|", { a: 1, b: 3 });
      expectObservable(source$.pipe(map((x) => x * 2))).toBe(expected, {
        a: 2,
        b: 6,
      });
    });
  });

  it("should map multiple values", () => {
    scheduler.run(({ expectObservable, cold, expectSubscriptions }) => {
      const e1 = cold(" --1--2--3--|");
      const e1subs = "  ^----------!";
      const expected = "--x--y--z--|";
      const result = e1.pipe(map((x) => 10 * +x));

      expectObservable(result).toBe(expected, { x: 10, y: 20, z: 30 });
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it("create virtual time", () => {
    const time = scheduler.createTime("-----|");
    assert.equal(time, 50);
  });

  it("empty stream", () => {
    const source$ = EMPTY;
    const expected = "|";
    scheduler.expectObservable(source$).toBe(expected);
    scheduler.flush();
  });

  it("error stream", () => {
    const srouce$ = throwError(() => "error");
    const expected = "#";

    scheduler.expectObservable(srouce$).toBe(expected, undefined, "error");
    scheduler.flush();
  });

  it("never stream", () => {
    const srouce$ = NEVER;
    const expected = "-------";

    scheduler.expectObservable(srouce$).toBe(expected);
    scheduler.flush();
  });

  it("interval in TestScheduler", () => {
    scheduler.run(({ expectObservable, cold }) => {
      const source$ = interval(1, scheduler).pipe(
        take(4),
        map((x) => x.toString())
      );
      const expected = "-012(3|)";
      expectObservable(source$).toBe(expected);
    });
  });

  it("should work with merge operator", () => {
    scheduler.run(({ expectObservable, cold }) => {
      const source1 = " -a----b---|";
      const source2 = " -c----d---|";
      const expected = "-(ac)-(bd)|";
      const source$1 = cold(source1);
      const source$2 = cold(source2);
      const merged$ = merge(source$1, source$2);
      expectObservable(merged$).toBe(expected);
    });
  });

  it("should work with hot Observable", () => {
    scheduler.run(({ expectObservable, hot }) => {
      const source1 = "-a-^b----|";
      const source2 = "---^---c-|";
      const expected = "  -b--c-|";

      const source$1 = hot(source1);
      const source$2 = hot(source2);

      const merged$ = merge(source$1, source$2);
      expectObservable(merged$).toBe(expected);
    });
  });

  it("should work with both hot and cold Observable", () => {
    scheduler.run(({ expectObservable, hot }) => {
      const source1 = "-a-^b----|";
      const source2 = "   --c-  |";
      const expected = "  -bc---|";

      const source$1 = hot(source1);
      const source$2 = hot(source2);

      const merged$ = merge(source$1, source$2);
      expectObservable(merged$).toBe(expected);
    });
  });

  it("check subscription marble", () => {
    scheduler.run(({ expectObservable, cold, expectSubscriptions }) => {
      const source1 = "     -a-b--|";
      const source2 = "           -c--d-|";
      const expectedRes = " -a-b---c--d-|";
      const expectedSub1 = "^-----!";
      const expectedSub2 = "------^-----!";

      const src1$ = cold(source1);
      const src2$ = cold(source2);
      expectObservable(concat(src1$, src2$)).toBe(expectedRes);
      expectSubscriptions(src1$.subscriptions).toBe(expectedSub1);
      expectSubscriptions(src2$.subscriptions).toBe(expectedSub2);
    });
  });
});
