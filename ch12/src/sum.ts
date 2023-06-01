import { Observable, reduce } from "rxjs";

export const sum = (source$: Observable<number | string>) => {
  return source$.pipe(reduce((a, b) => a + parseInt(b as string, 10), 0));
};
