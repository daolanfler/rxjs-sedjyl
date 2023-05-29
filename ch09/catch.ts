import { catchError, map, of, range, repeat, take } from "rxjs";

const throwUnluckyNumber = (val: number) => {
  if (val === 4) {
    throw new Error("Unlucky Number");
  }
  return val;
};

const source$ = range(1, 5);
const error$ = source$.pipe(map(throwUnluckyNumber));

// error$.subscribe((val) => console.log(val));

const catch$ = error$.pipe(catchError((err) => of(8)));

// catch$.subscribe((val) => console.log(val))

error$.pipe(catchError((err, caught$) => {
    console.log(err.message);
    // return of(8).pipe(repeat(8));
    return caught$
}), take(10)).subscribe(console.log)
