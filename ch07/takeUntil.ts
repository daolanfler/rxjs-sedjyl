import { fromEvent, interval, takeUntil, throwError, timer } from "rxjs";

const interval$ = interval(1000);
const notifier$ = timer(2500);
const takeUntil$ = interval$.pipe(takeUntil(notifier$));

// takeUntil$.subscribe(console.log);

// interval$.pipe(takeUntil(throwError(new Error('an error')))).subscribe()

let clickCount = 0;
const event$ = fromEvent(
  document.querySelector("#clickMe") as HTMLButtonElement,
  "click"
);
const countDown$ = timer(5000);
const filtered$ = event$.pipe(takeUntil(countDown$));

countDown$.subscribe(() => {
  (document.querySelector("#text") as HTMLButtonElement).innerHTML =
    "时间结束" + clickCount;
});

filtered$.subscribe(() => {
  ++clickCount;
});

const t = setTimeout(() => {});
console.log("t value: ", t); // see t's value, countDown$ actually triggers 2 timer
