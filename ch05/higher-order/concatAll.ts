import { concatAll, interval, map, take, tap } from 'rxjs';


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
  ),
).pipe(concatAll());

ho$.subscribe(console.log);
