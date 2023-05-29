import { interval, mergeMap, take } from "rxjs";

const project = (x: number) => interval(100).pipe(take(5))
const source$ = interval(200).pipe(take(2))
const result$ = source$.pipe(mergeMap(project))
result$.subscribe(console.log)