import { filter, map, pipe, range, tap } from "rxjs";

window.isDev = true;

// as tap has one generic type, the wrapper around it can also have a generic
// type just like the function parameter...
const flagDo = <T>(...args: Parameters<typeof tap<T>>) => {
  if (window.isDev) {
    return tap<T>(...args);
  } else {
    return tap<T>();
  }
};

const source$ = range(1, 10).pipe(
  filter((x) => x % 2 === 0),
  flagDo((x) => console.log("after filter: ", x)),

  map((x) => x * x)
);

source$
  .pipe(
    tap((value) => {
      console.log("source$ data: ", value);
    })
  )
  .subscribe(console.log);
