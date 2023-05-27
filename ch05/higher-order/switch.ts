import { interval, map, switchAll, switchMap, take } from 'rxjs';

const ho$ = interval(1000).pipe(
  take(2),
  map((a) =>
    interval(1500).pipe(
      map((b) => `${a}: ${b}`),
      take(3)
    )
  )
);

ho$.pipe(switchAll()).subscribe(console.log, null, () => {
  console.log('complete');
});

// const ho$ = interval(1000).pipe(
//   take(3),
//   map((x) =>
//     interval(700).pipe(
//       map((y) => `${x}: ${y}`),
//       take(2)
//     )
//   )
// );

// ho$.pipe(switchAll()).subscribe(console.log, null, () => {
//   console.log('complete');
// });
