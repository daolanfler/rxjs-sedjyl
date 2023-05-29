import { BehaviorSubject, Subject, interval, share, take, tap } from "rxjs";

const interval$ = interval(1000).pipe(
  take(3),
  tap((x) => {
    console.log("source ", x);
  })
);

const result$1 = interval$.pipe(
  share({
    connector: () => new BehaviorSubject(100),
    resetOnComplete: false, // with this set to false, new subscription will not start the tick
  })
);

setTimeout(() => {
  result$1.subscribe({
    next: (val) => console.log(val),
    complete: () => {
      console.log("share BehaviorSubject complete");
    },
  });
}, 5000);

result$1.subscribe({
  next: (val) => console.log(val),
  complete: () => {
    console.log("share BehaviorSubject complete");
  },
});




/** ---------- divide -------------- */

const result$2 = interval$.pipe(share({
  connector: () => new Subject(),
  resetOnComplete: false
}));

result$2.subscribe({
  next: (val) => console.log("subject", val),
  complete: () => {
    console.log("share Subject complete");
  }
})
