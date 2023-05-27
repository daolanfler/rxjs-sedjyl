// those operator that accpet a predicate function

import {
  every,
  of,
  interval,
  find,
  findIndex,
  zip,
  isEmpty,
  Observable,
  defaultIfEmpty,
} from 'rxjs';

const source$ = of(3, 1, 4, 1, 5, 9);
const every$ = source$.pipe(every((x) => x > 0));
//    ^?
every$.subscribe(console.log);

// will not end, but will log x
// interval(1000)
//   .pipe(
//     every((x) => {
//       console.log(x);
//       return x >= 0;
//     })
//   )
//   .subscribe(console.log);

const isEven = (x: number) => x % 2 === 0;
const find$ = source$.pipe(find(isEven));
const findIndex$ = source$.pipe(findIndex(isEven));
zip(find$, findIndex$).subscribe(console.log);

// interval(1000).pipe(isEmpty()).subscribe(console.log)
const manualEmpty = new Observable((observer) => {
  setTimeout(() => {
    observer.complete();
  }, 1000);
});
manualEmpty.pipe(isEmpty()).subscribe((val) => {
  console.log('manualEmpty is empty?', val);
});
manualEmpty
  .pipe(defaultIfEmpty('this is the default value'))
  .subscribe(console.log);
