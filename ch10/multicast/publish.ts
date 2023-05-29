import { interval, share, take } from "rxjs";

const tick$ = interval(1000).pipe(take(3));

// publish is deprecated
// https://rxjs.dev/deprecations/multicasting#publish
// simple use case, subject is not a factory fn, thus cannot reset
const sharedTicks = tick$.pipe(
  share({
    resetOnComplete: false,
    resetOnError: false,
    resetOnRefCountZero: false,
  })
);

sharedTicks.subscribe((value) => {
  console.log("observer 1: ", value);
});

setTimeout(() => {
  sharedTicks.subscribe((value) => {
    console.log("observer 2: ", value);
  }, null, () => {
    console.log("complete");
  });
}, 5000);
