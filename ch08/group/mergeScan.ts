import { interval, mergeScan, of } from "rxjs";

interval(1000)
  .pipe(
    mergeScan((acc, value) => {
      return of(acc + value);
    }, 0)
  )
  .subscribe(console.log);
