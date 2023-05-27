import { first, map, of, interval } from 'rxjs';

// const source$ = of(1, 2, 3, 4);
// const first$ = source$.pipe(
//   map((item, index) => {
//     return {
//       value: item,
//       index: index,
//     }
//   }),
//   first(
//     (x) => x.value % 2 === 100,
//     "a default value"
//   )
// );

// first$.subscribe({
//   complete: () => console.log('complete'),
//   next: console.log,
// });

interval(1000).pipe(first()).subscribe(console.log)
