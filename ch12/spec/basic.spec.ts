import { of, range } from "rxjs";
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
});
