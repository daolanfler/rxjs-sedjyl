import { interval, map, take, tap } from 'rxjs';

const ho$ = interval(1000).pipe(
  take(2),
  map((a) =>
    interval(2000)
      .pipe(
        take(2),
        map((b) => {
          return `${a}: ${b}`;
        })
      )
      .subscribe(console.log)
  )
);

ho$.subscribe(console.log);
