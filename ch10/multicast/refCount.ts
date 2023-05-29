import { Subject, connectable, interval, refCount, share, take } from "rxjs";

// rc: ref counting

const coldSource$ = interval(1000).pipe(take(3));

// const tick$ = connectable(coldSource$, {
//   connector() {
//     return new Subject();
//   },
// }).pipe(refCount());

// setTimeout(() => {
//   tick$.subscribe((value) => {
//     console.log("observer 1: ", value);
//   });
// }, 500);

// setTimeout(() => {
//   tick$.subscribe((value) => {
//     console.log("observer 2: ", value);
//   });
// }, 2000);


const tick$  = coldSource$.pipe(share({
    connector: () => new Subject(),
}))

setTimeout(() => {
  tick$.subscribe((value) => {
    console.log("observer 1: ", value);
  });
}, 0);


// 重新开了一个 cold observable
setTimeout(() => {
  tick$.subscribe((value) => {
    console.log("observer 2: ", value);
  });
}, 5000);
