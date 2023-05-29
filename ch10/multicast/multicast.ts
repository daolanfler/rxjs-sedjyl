import {
  ConnectableObservable,
  Subject,
  connect,
  connectable,
  interval,
  multicast,
  take,
} from "rxjs";

const coldSource$ = interval(1000).pipe(take(3));

/** ---- deprecated------ */
// const tick$ = coldSource$.pipe(
//   multicast(() => new Subject<number>())
// ) as ConnectableObservable<number>;

// tick$.subscribe((value) => {
//   console.log("observer 1: ", value);
// });

// setTimeout(() => {
//   tick$.subscribe((value) => {
//     console.log("observer 2: ", value);
//   });
// }, 1500);

// tick$.connect();
/** ---- deprecated------ */

const tick$ = connectable(coldSource$, {
    connector: () => new Subject(),
})
tick$.subscribe((value) => {
  console.log("observer 1: ", value);
});

setTimeout(() => {
  tick$.subscribe((value) => {
    console.log("observer 2: ", value);
  });
}, 1500);

tick$.connect();
