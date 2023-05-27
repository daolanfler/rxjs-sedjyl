import { interval, auditTime, take, map, concatWith, audit, timer } from 'rxjs';

// const source$ = interval(1000)
// const result$ = source$.pipe(auditTime(2000))

// result$.subscribe(console.log)

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

source$.pipe(audit((value) => timer(800))).subscribe(console.log, null, () => {
  console.log('complete');
});
