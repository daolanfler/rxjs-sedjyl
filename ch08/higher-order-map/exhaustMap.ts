import { exhaustMap, interval, switchMap, take, tap } from "rxjs";

const project = (x: number) =>
  interval(100).pipe(
    take(5),
    tap((v) => console.log(`inner ${x}: ${v}`))
  );

const source = interval(200).pipe(take(4));

const result$ = source.pipe(exhaustMap(project)).forEach((v) => {
  console.log(v);
});

// 和 switchMap 相反，先产生的 Observable 有更高的优先级