import { interval, switchMap, take, tap } from "rxjs";

const project = (x: number) =>
  interval(100).pipe(
    take(5),
    tap((v) => console.log(`inner ${x}: ${v}`))
  );

const source = interval(200).pipe(take(2));

const result$ = source.pipe(switchMap(project)).forEach((v) => {
  console.log(v);
});
