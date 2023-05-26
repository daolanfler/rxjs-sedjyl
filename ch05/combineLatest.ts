import { combineLatestWith, timer, NEVER, map } from 'rxjs';

// const source$1 = timer(500, 1000);
// const source$2 = timer(0, 1000);

// combineLatest(source$1, source$2, (x, y) => {
//   return `source$1: ${x}, source$2: ${y}`
// }).subscribe(console.log);

const original$ = timer(0, 1000);

const source$1 = original$.pipe(map((x) => x + 'a'));
const source$2 = original$.pipe(map((x) => x + 'b'));
const result$ = source$1.pipe(combineLatestWith(source$2));
// glitch 存在
result$.subscribe(console.log, null, () => {
  console.log('complete');
});
