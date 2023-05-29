import { catchError, map, of, range, retry } from "rxjs";

const throwUnluckyNumber = (val: number) => {
  if (val === 4) {
    throw new Error("Unlucky Number");
  }
  return val;
};

const source$ = range(1, 5);
const error$ = source$.pipe(map(throwUnluckyNumber));

error$.pipe(retry(2), catchError(e => {
   return of(8)
})).subscribe(console.log)