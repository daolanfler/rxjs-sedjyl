import { concat, of, interval, concatWith, take, count, timer } from 'rxjs';

// const source$ = of(1, 2, 3).pipe(concatWith(interval(1000).pipe(take(2))));

// source$.pipe(count()).subscribe(console.log, null, () => {
//   console.log('complete');
// });

const source$ = concat(timer(1000), timer(1000));
source$.pipe(count()).subscribe(console.log)