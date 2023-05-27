import { interval, concat, map, take, zipAll, NEVER, concatWith } from 'rxjs';

const ho$ = interval(1000)
  .pipe(
    take(2)
    // 一个 emit 2 次永远不会完结的高阶 Observable，zipAll 要等到确定有多少组之后才能推送数据
    // concatWith(NEVER)
  )
  .pipe(
    map((x) =>
      interval(1500).pipe(
        map((y) => {
          return `${x}: ${y}`;
        }),
        take(2)
      )
    )
  );

ho$.pipe(zipAll()).subscribe(console.log, null, () => {
  console.log('complete');
});
