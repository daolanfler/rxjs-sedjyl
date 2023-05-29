import { buffer, mergeAll, timer, window } from "rxjs";

// window doc says: 
// "Branch out the source Observable values as a nested Observable whenever `windowBoundaries` emits."

const source$ = timer(0, 1000);
const notifier$ = timer(4500); // 前一个缓存窗口的结束，后一个的开始
const result$ = source$.pipe(window(notifier$));

// result$.forEach((ob) => {
//   console.log("open ", ob);
//   ob.subscribe({
//     complete: () => {
//       console.log("close inner");
//     },
//     next: console.log,
//   });
// });

// result$.subscribe({
//     next: ob => {
//         console.log("open ", ob);
//         ob.subscribe({
//             complete: () => {
//                 console.log("close inner");
//             },
//             next: console.log,
//         });
//     },
//     complete: () => {
//         console.log("close outer");
//     }
// })

source$.pipe(buffer(timer(0, 4000))).subscribe(console.log)