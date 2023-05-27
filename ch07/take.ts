import { filter, interval, of, pipe, take, takeLast } from 'rxjs';

const interval$ = interval(1000);
// interval$.subscribe(console.log)

// interval$.pipe(take(3)).subscribe(console.log)

const of$ = of(3, 1, 4, 1, 5, 9);
// of$.pipe(takeLast(3)).subscribe(console.log)

const takeCountWhile = (
  count: number,
  predicate: (v: number, index: number) => boolean
) => {
  return pipe(filter(predicate), take(count));
};

interval$.pipe(takeCountWhile(3, (x) => x % 2 == 0)).subscribe(console.log);
