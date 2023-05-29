import { groupBy, interval, partition } from "rxjs";

const intervalStream$ = interval(100);
const [even$, odd$] = partition(intervalStream$, (val) => val % 2 === 0);

even$.subscribe((val) => {
  console.log("even: ", val);
});
