import { Subject, interval, take } from "rxjs";

const subject = new Subject();

const subscription1 = subject.subscribe({
  next: (v) => console.log("on observer 1 data: ", v),
  error: (err) => console.log("on observer 1 error: ", err.message),
  complete: () => console.log("on observer 1 complete"),
});

// subject.next(1);

const subscription2 = subject.subscribe({
  next: (v) => console.log("on observer 2 data: ", v),
  error: (err) => console.log("on observer 2 error: ", err.message),
  complete: () => console.log("on observer 2 complete"),
});

// subject.next(2);
// subscription1.unsubscribe();
// subject.complete();

// cold
const interval$ = interval(1000).pipe(take(3));
const subject2 = new Subject();
interval$.subscribe(subject2);

subject2.subscribe({
  next: (v) => console.log("on observer A data: ", v),
  complete: () => {
    console.log("on observer A complete");
  },
});
setTimeout(() => {
  subject2.subscribe({
    next: (v) => console.log("on observer B data: ", v),
  complete: () => {
    console.log("on observer B complete");
  },
  });
}, 1500);
