import mitt from "mitt";
import { Observable, delay, interval, map, retry, retryWhen, take, timer } from "rxjs";
const throwUnluckyNumber = (val: number) => {
  if (val === 4) {
    throw new Error("Unlucky Number");
  }
  return val;
};

// if the source Observalbe doesn't emit value synchronously
// interval(600)
//   .pipe(
//     map(throwUnluckyNumber),
//     retryWhen((err$) => interval(1000))
//   )
//   .subscribe(console.log);

const emitter = mitt<{ tick: number }>();

interval(600).subscribe((val) => {
  emitter.emit("tick", val);
});

let subscriberCount = 0;
const hotSource$ = new Observable<number>((observer) => {
  subscriberCount ++;
  console.log("on subscribe", subscriberCount);

  const listener = (value: number) => observer.next(value);
  emitter.on("tick", listener);

  return () => {
    console.log("on unsubscribe");
    subscriberCount --;
    emitter.off("tick", listener);
  };
});

const error$ = hotSource$.pipe(map(throwUnluckyNumber));
const retry$ = error$.pipe(retry(1));

// retry$.subscribe({
//   complete() {
//     console.log("complete");
//   },
//   next: (val) => {
//     console.log("value: ", val);
//   },
//   error: (err) => {
//     console.log("error: ", err);
//   },
// });

hotSource$
  .pipe(
    map(throwUnluckyNumber),
    retryWhen((err$) => {
      return interval(1000);
    })
  )
  .subscribe({
    complete() {
      console.log("complete");
    },
    next: (val) => {
      console.log("value: ", val);
    },
    error: (err) => {
      console.log("error: ", err);
    },
  });
