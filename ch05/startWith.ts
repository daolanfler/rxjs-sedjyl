import { concat, of, startWith, timer } from 'rxjs';

// const original$ = timer(0, 1000);
// const result$ = original$.pipe(startWith('start'));

// result$.subscribe(console.log, null, () => {
//   console.log('complete');
// });

const original$ = timer(1000, 1000);
const result$ = concat(of('start'), original$);
result$.subscribe(console.log)
