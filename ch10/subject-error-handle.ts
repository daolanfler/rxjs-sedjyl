import { Subject, interval, map, take } from "rxjs";

const throwUnluckyNumber = (val: number) => {
  if (val === 4) {
    throw new Error("Unlucky Number");
  }
  return val;
};

const tick$ = interval(1000).pipe(take(10));
const subject = new Subject<number>();

tick$.subscribe(subject);

subject.pipe(map(throwUnluckyNumber)).subscribe((value) => {
  console.log("observer 1: ", value);
});

subject.subscribe({
  next: (value) => {
    console.log("observer 2: ", value);
  },
  error: (err) => {
    console.log("observer 2: ", err.message);
  },
});
