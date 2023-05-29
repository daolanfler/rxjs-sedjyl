import { AsyncSubject, async, connectable, interval, share, take } from "rxjs";

const ticks$ = interval(1000).pipe(take(3));

// const toConnect = connectable(interval(1_000).pipe(take(4)), {
//   connector: () => new AsyncSubject<number>(),
//   resetOnDisconnect: false,
// });

// toConnect.subscribe({
//   complete: () => {
//     console.log("complete");
//   },
//   next: console.log,
// });
// setTimeout(() => {
//   toConnect.connect();
// }, 1000);

const shared$ = ticks$.pipe(
  share({
    connector: () => new AsyncSubject<number>(),
    resetOnComplete: false,
    resetOnError: false,
    resetOnRefCountZero: false,
  })
);

shared$.subscribe({
    next: (value) => {
        console.log("observer 1: ", value);
        
    },
    complete: () => {
        console.log("complete 1");
    }
})

setTimeout(() => {
    shared$.subscribe({
        next: (value) => {
            console.log("observer 2: ", value);
            
        },
        complete: () => {
            console.log("complete 2");
        }
    })
}, 5000);