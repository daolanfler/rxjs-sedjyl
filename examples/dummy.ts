import { delay, interval, merge, mergeWith, take, tap } from "rxjs";

const tick$ = interval(1000).pipe(
  take(3),
  tap({
    subscribe: () => {
      console.log("subscription started");
    },
    complete: () => {
        console.log('complete')
    }
  })
);

// will start 2 timers 
const delayedTick$ = tick$.pipe(delay(5000));

merge(delayedTick$, tick$, ).subscribe({
  next: (val) => console.log("observer X: ", val),
});
