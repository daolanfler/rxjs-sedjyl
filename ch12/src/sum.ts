import { Observable, reduce, scan, map, merge } from "rxjs";

export const sum = (source$: Observable<number | string>) => {
  return source$.pipe(reduce((a, b) => a + parseInt(b as string, 10), 0));
};

export const counterPipe = (
  plus$: Observable<any>,
  minus$: Observable<any>
) => {
  return merge(plus$.pipe(map(() => 1)), minus$.pipe(map(() => -1))).pipe(
    scan((acc, current) => acc + current, 0)
  );
};
