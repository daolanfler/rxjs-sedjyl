import { interval, lastValueFrom, of, pipe, range, take } from "rxjs";
import { sum } from "../src/sum";
import { assert } from "chai";

describe("operator sum", () => {
  it("should sum up range of value", () => {
    const source$ = range(1, 5);

    const result$ = source$.pipe(sum);

    result$.subscribe((value) => assert.equal(value, 15));
  });

  it("should sum up string value", () => {
    const source$ = of("1", "2", "3");
    const result$ = source$.pipe(sum);
    result$.subscribe((value) => assert.equal(6, value));
  });

  it("interval and take should work", (done) => {
    const result: number[] = [];
    interval(100)
      .pipe(take(4))
      .subscribe({
        next: (value) => {
          result.push(value);
        },
        complete: () => {
          assert.deepEqual([0, 1, 2, 3], result);
          done();
        },
      });
  });

  it("interval and take should work", () => {
    const source$ = interval(100).pipe(take(4), sum);
    // return a promise to let mocha know it's done
    return lastValueFrom(source$).then((val) => {
      assert.equal(val, 6);
    });
  });
});
