import { Subject, interval, take } from "rxjs";

const subject = new Subject();

const subscription1 = subject.subscribe({
  next: (v) => console.log("on observer 1 data: ", v),
  error: (err) => console.log("on observer 1 error: ", err.message),
  complete: () => console.log("on observer 1 complete"),
});

subject.next(1);
subject.next(2);
// subject.complete();
subject.error(new Error("something went wrong"));

const subscription2 = subject.subscribe({
  next: (v) => console.log("on observer 2 data: ", v),
  error: (err) => console.log("on observer 2 error: ", err.message),
  complete: () => console.log("on observer 2 complete"),
});

// doesn't do anything
subject.next(3)