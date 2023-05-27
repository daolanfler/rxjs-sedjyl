import { exhaustAll, interval, map, take } from 'rxjs';
const ho$ = interval(1000).pipe(
  take(3),
  map((x) => interval(700).pipe(map((y) => `${x} : ${y}`), take(2)))
);

ho$.pipe(exhaustAll()).subscribe(console.log, null, () => {
  console.log('complete');
});
