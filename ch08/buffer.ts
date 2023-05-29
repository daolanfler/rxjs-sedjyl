import { bufferTime, concat, concatAll, take, timer, windowTime } from "rxjs";

timer(0, 100).pipe(bufferTime(400), take(3)).subscribe(console.log)