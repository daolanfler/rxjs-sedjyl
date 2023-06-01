import { filter, map, Observable, of, pipe } from "rxjs";

const map2 = (fn) => (obs$) =>
  new Observable((observer) => {
    obs$.subscribe({
      next: (value) => observer.next(fn(value)),
      error: (err) => observer.error(err),
      complete: () => observer.complete(),
    });
  });
const source$ = of(1, 2, 3);
const double = map2((x: number) => x * 2);

const x = pipe(pipe(double));

const result$ = source$
  .pipe(x)
  .pipe(map((x) => (x as number) + 0.1))
  .pipe(filter((x) => x > 4));

result$.subscribe(console.log);

// do -> tap (窃听) 对数据不做改变
// catch -> catch Error
// switch -> switchAll
// finally -> finalize
// |> 管道操作符， TC39 提案？？
