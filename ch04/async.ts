import {
  from,
  fromEvent,
  Observable,
  tap,
  timer,
  interval,
  of,
  repeat,
  repeatWhen,
  delay,
} from 'rxjs';

// const now = new Date();
// const later=  new Date(now.getTime() + 1000);
// const source$ = timer(2000, 1000)
// source$.subscribe(console.log);

// from accept Iterables e.g. a Generator
// from([1,2,3]).subscribe(console.log)

// Hot
// fromEvent(document, 'click').pipe(tap(e => {
//   console.log(e.target)
// })).subscribe()

const notifier = () => {
  return interval(1000);
};

const source$ = of(1, 2, 3)
const repeated$ = source$.pipe(repeatWhen(notifier));
repeated$.subscribe(console.log);
