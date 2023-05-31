// https://rxjs.dev/api/index/function/connect
// 在 7.8.1 中，使用 connect 替代 multicast + selector 的组合

import {
  Subject,
  concatWith,
  connect,
  delay,
  interval,
  merge,
  mergeWith,
  multicast,
  of,
  take,
  tap,
} from "rxjs";

/** ------------- START -------------- */

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

/** ------------- END -------------- */

/** ------------- START -------------- */
const tick$1 = interval(1000).pipe(
  tap({
    next: (v) => console.log("source emits: ", v),
    subscribe: () => console.log("subscription started"),
  }),
  take(2),
);
// // 资源浪费
// const delayedTick$ = tick$1.pipe(delay(500));
// const mergeTick$ = merge(delayedTick$, tick$1)
// mergeTick$.subscribe((v) => {
//   console.log("observer X: ", v);
// });

// 改进 source 只会 log 一次
const coldSource$ = interval(1000).pipe(
  tap((x) => {
    console.log("source: ", x);
  }),
  take(2),
);
const result$ = coldSource$.pipe(
  multicast(new Subject(), (shared) => {
    const tick$ = shared;
    const delayedTick$ = tick$.pipe(delay(500));
    const mergedTick$ = delayedTick$.pipe(mergeWith(tick$));
    return mergedTick$;
  })
);
result$.subscribe((value) => {
  console.log("observer : ", value);
});

// // 在 selector 里面已经被 multicast 了，再来一次就还是会启动 cold observable
// result$.subscribe(value => {
//     console.log('observer B : ', value)
// })
/** ------------- END-------------- */

/** ---------- START ----------- */
/**
 * 使用新的 api connect 替代 multicast + selector 的组合
 *
 * To use `connect`, you provide a `selector` function that will give you a
 * multicast observable that is not yet connected. You then use that multicast
 * observable to create a resulting observable that, when subscribed, will set
 * up your multicast. This is generally, but not always, accomplished with
 * `merge`.
 */
// const coldSource$ = interval(1000).pipe(
//   take(3),
//   tap({
//     next: (x) => {
//       console.log("source emits: ", x);
//     },
//     subscribe: () => {
//       console.log("subscription started");
//     },
//   })
// );
// const result$ = coldSource$.pipe(
//   connect(
//     (shared$) => {
//       return merge(shared$.pipe(delay(500)), shared$);
//     },
//     {
//       connector: () => new Subject(),
//     }
//   )
// );

// result$.subscribe((value) => {
//   console.log("observer A : ", value);
// });
/** ------------- END-------------- */
