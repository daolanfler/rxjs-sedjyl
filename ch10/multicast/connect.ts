// used to be `multicast` with `selector`

import {
  Subject,
  concatWith,
  connect,
  delay,
  interval,
  mergeWith,
  multicast,
  of,
  take,
  tap,
} from "rxjs";

// const coldSource$ = interval(1000).pipe(take(3));
// const selector = (shared: () => Subject<any>) => {
//     return shared().pipe(concatWith(of('done')))
// }
// const tick$ = coldSource$.pipe(multicast(new Subject(), selector))

// const tick$ = coldSource$.pipe(
//   connect(
//     (source) => {
//       return source.pipe(concatWith(of("done")));
//     },
//     {
//       connector: () => new Subject(),
//     }
//   )
// );

// tick$.subscribe((val) => {
//     console.log('observer 1: ', val)
// });

// setTimeout(() => {
//     tick$.subscribe((val) => {
//         console.log('observer 2: ', val)
//     })
// }, 5000)

const tick$1 = interval(1000).pipe(
  take(2),
  tap((v) => console.log("source: ", v))
);

/** ------------- START -------------- */
// 资源浪费
// const delayedTick$ = tick$1.pipe(delay(500));
// const mergeTick$ = delayedTick$.pipe(mergeWith(tick$1));
// mergeTick$.subscribe((v) => {
//   console.log("observer: ", v);
// });

// 改进 source 只会 log 一次
// const coldSource$ = interval(1000).pipe(
//   take(2),
//   tap((x) => {
//     console.log("source: ", x);
//   })
// );
// const result$ = coldSource$.pipe(
//   multicast(new Subject(), (shared) => {
//     const tick$ = shared;
//     const delayedTick$ = tick$.pipe(delay(500));
//     const mergedTick$ = delayedTick$.pipe(mergeWith(tick$));
//     return mergedTick$;
//   })
// );
// result$.subscribe((value) => {
//   console.log("observer : ", value);
// });

// 不适用！！
// result$.subscribe(value => {
//     console.log('observer B : ', value)
// })
/** ------------- END-------------- */

/** ---------- START ----------- */

// 资源浪费
const delayedTick$ = tick$1.pipe(delay(500));
const mergeTick$ = delayedTick$.pipe(mergeWith(tick$1));

// 改进 source 只会 log 一次
const coldSource$ = interval(1000).pipe(
  take(2),
  tap((x) => {
    console.log("source: ", x);
  })
);
const result$ = coldSource$.pipe(
  connect(
    (source) => {
      const tick$ = source;
      const delayedTick$ = tick$.pipe(delay(500));
      const mergedTick$ = delayedTick$.pipe(mergeWith(tick$));
      return mergedTick$;
    },
    {
      connector: () => new Subject(),
    }
  )
);

result$.subscribe((value) => {
  console.log("observer : ", value);
});
/** ------------- END-------------- */
