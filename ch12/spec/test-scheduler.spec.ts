import { TestScheduler } from "rxjs/testing";
import { assert, expect } from "chai";
import { EMPTY, map, throwError } from "rxjs";

let scheduler: TestScheduler;

describe("Observable", () => {
  beforeEach(() => {
    scheduler = new TestScheduler(assert.deepEqual.bind(assert));
  });

  it("should parse marble diagrams", () => {
    const source = "--a--b--|";
    const expected = "--a--b--|";

    const source$ = scheduler.createColdObservable(source);

    scheduler.expectObservable(source$).toBe(expected);
    scheduler.flush();
  });

  it("should work with map operator", () => {
    const source = "-a-b|";
    const expected = "-a-b|";

    const srouce$ = scheduler.createColdObservable(source, { a: 1, b: 3 });
    scheduler
      .expectObservable(srouce$.pipe(map((x) => x * 2)))
      .toBe(expected, { a: 2, b: 6 });
    scheduler.flush();
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
    const srouce$ = throwError(() => "error")
    const expected = "#";

    scheduler.expectObservable(srouce$).toBe(expected, undefined, "error");
    scheduler.flush();
  });
});
