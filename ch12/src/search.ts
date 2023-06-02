import {
  Observable,
  SchedulerLike,
  debounceTime,
  filter,
  from,
  map,
  switchMap,
} from "rxjs";

export const searchRepo2$ = (
  key$: Observable<any>,
  fetch$: (url: string) => Observable<any>,
  dueTime: number,
  scheduler?: SchedulerLike
) => {
  return key$.pipe(
    debounceTime(dueTime, scheduler),
    map((event) => (event.target as any).value),
    map((text) => text.trim()),
    filter((query) => query.length !== 0),
    switchMap(fetch$)
  );
};
