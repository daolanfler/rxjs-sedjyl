import { bufferTime, concat, concatAll, merge, mergeAll, take, timer, windowTime } from "rxjs";

// the third Observable just starts subscribing, but never logs one value, and never completes.
// Because the timer is already completed, no value comming from upper stream.
// timer(0, 1000)
//   .pipe(windowTime(4000), take(3))
//   .subscribe({
//     complete: () => {
//       console.log("the outer complete");
//     },
//     next: (ob) => {
//       console.log("subscribing", ob);
//       ob.subscribe({
//         complete: () => {
//           console.log("the inner complete");
//         },
//         next: console.log,
//       });
//     },
//   });



const source$ = timer(0, 1000);
const result$ = source$.pipe(windowTime(4000, 2000, 3));
result$.pipe(mergeAll()).subscribe(console.log)

// timer(0, 100).pipe(bufferTime(400), take(3)).subscribe(console.log)