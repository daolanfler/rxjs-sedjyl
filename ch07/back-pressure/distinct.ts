import {
  distinct,
  of,
  interval,
  map,
  distinctUntilChanged,
  distinctUntilKeyChanged,
} from 'rxjs';

const source$ = of(
  { name: 'RxJS', version: 'v4' },
  {
    name: 'React',
    version: 'v15',
  },
  { name: 'React', version: 'v16' },
  { name: 'RxJS', version: 'v5' }
);

// source$.pipe(distinct((x) => x.name)).subscribe(console.log);

// interval(100)
//   .pipe(map((x) => x % 1000))
//   .pipe(distinct(null, interval(500)))
//   .subscribe(console.log);

source$.pipe(distinctUntilKeyChanged('name')).subscribe(console.log);
