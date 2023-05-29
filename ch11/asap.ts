import { asapScheduler, observeOn, range } from "rxjs";

const start = Date.now();

console.log("before subscribe");

range(1, 1_0_000).subscribe({
  complete: () => {
    const end = Date.now();
    console.log(`Time elapsed: ${end - start} ms`);
  },
});

console.log("after subscribe");


const start1 = Date.now();

console.log("before subscribe");

range(1, 1_0_000, ).pipe(observeOn(asapScheduler)).subscribe({
  complete: () => {
    const end = Date.now();
    console.log(`Time elapsed: ${end - start1} ms`);
  },
});

console.log("after subscribe");