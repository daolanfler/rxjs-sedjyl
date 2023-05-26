import { map, timer, withLatestFrom } from 'rxjs';

// const source$1 = timer(0, 2000);
// const source$2 = timer(500, 1000);
// source$1
//   .pipe(
//     withLatestFrom(source$2, (x, y) => {
//       return `${x * 100} - ${y}`;
//     })
//   )
//   .subscribe(console.log);

// fix glitch
const original$ = timer(0, 1000);
const source$1 = original$.pipe(map(x => x + 'a'));
const source$2 = original$.pipe(map(x => x + 'b'));
source$1.pipe(withLatestFrom(source$2)).subscribe(console.log, null, () => {
  console.log('complete');
  
})