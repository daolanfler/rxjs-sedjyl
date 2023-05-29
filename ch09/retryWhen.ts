import {
  catchError,
  delay,
  delayWhen,
  interval,
  map,
  of,
  pipe,
  range,
  retry,
  retryWhen,
  scan,
  take,
  tap,
  timer,
} from "rxjs";

const throwUnluckyNumber = (val: number) => {
  if (val === 4) {
    throw new Error("Unlucky Number");
  }
  return val;
};

const source$ = range(1, 5);
const error$ = source$.pipe(map(throwUnluckyNumber));

// retryWhen 最多只会调用 notifier 一次
// error$.pipe(retryWhen((errors$) => {
//     return errors$.pipe(delay(1000))
// })).subscribe(console.log)

// error$.pipe(retry({
//     count: 1,
//     delay(err, retryCount) {
//         console.log(err)
//         return timer(1000)
//     },
// })).subscribe(console.log)

const retryWithDelay = (maxCount: number, delayMs: number) =>
  pipe(
    retryWhen((errors$) => {
      return errors$.pipe(
        scan((errorCount, err) => {
          if (errorCount >= maxCount) {
            throw err;
          }
          return errorCount + 1;
        }, 0),
        delay(delayMs)
      );
    })
  );

// error$.pipe(retryWithDelay(2, 1000)).subscribe(console.log);

//
const retryWithExponentialDelay = (maxCount: number, delayMs: number) =>
  pipe(
    retryWhen((errors$) => {
      return errors$.pipe(
        scan((errorCount, err) => {
          if (errorCount >= maxCount) {
            throw err;
          }
          return errorCount + 1;
        }, 0),
        delayWhen((errorCount) => {
          const delayTime = Math.pow(2, errorCount - 1) * delayMs;
          console.log(delayTime);

          return timer(delayTime);
        })
      );
    })
  );

// error$.pipe(retryWithExponentialDelay(4, 1000)).subscribe(console.log);
