import { bufferCount, mergeAll, take, timer, windowCount } from "rxjs";

// timer(0, 1000).pipe(windowCount(4), take(3), mergeAll()).subscribe(console.log)

// timer(0, 1000).pipe(windowCount(4, 5), take(3), mergeAll()).subscribe(console.log)

timer(0, 1000).pipe(bufferCount(4), take(3)).subscribe(console.log)

timer(0, 1000).pipe(bufferCount(4, 5), take(3)).subscribe(console.log)
