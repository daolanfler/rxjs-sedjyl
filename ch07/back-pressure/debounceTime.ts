import {
  filter,
  interval,
  debounceTime,
  takeUntil,
  take,
  mapTo,
  map,
  concatWith,
  throttleTime
} from 'rxjs';

// const source$ = interval(1000).pipe(filter((x) => x % 3 === 0));
// source$.pipe(debounceTime(2000)).subscribe(console.log);

const source$ = interval(500).pipe(
  take(2),
  map(() => 'A'),
  concatWith(
    interval(1000).pipe(
      take(3),
      map(() => 'B')
    )
  ),
  concatWith(
    interval(500).pipe(
      take(3),
      map(() => 'C')
    )
  )
);

// source$.pipe(debounceTime(800)).subscribe(console.log)
source$.pipe(throttleTime(800)).subscribe(console.log);
