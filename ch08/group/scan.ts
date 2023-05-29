import { interval, scan } from "rxjs";

const source$ = interval(100)
source$.pipe(scan((acc, cur) => acc + cur, 0)).subscribe(console.log)