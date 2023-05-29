import { mergeAll, take, timer, windowWhen } from "rxjs";

// 利用 Observable 来控制缓冲区的开始与结束

const closingSelector = () => {
  return timer(400);
};

timer(0, 100)
  .pipe(windowWhen(closingSelector), take(3))
  .subscribe({
    complete: () => {
      console.log("the outer complete");
    },
    next: (ob) => {
      console.log("subscribing", ob);

      ob.subscribe({
        next: console.log,
        complete: () => {
          console.log("the inner complete");
        },
      });
    },
  });
