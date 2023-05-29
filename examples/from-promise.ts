import { from, tap } from "rxjs";

// Hot, fromPromise 实现很简单， promise 本身就自带状态
const source$ = from(
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("creating promise");
      resolve("hello");
    }, 1000);
  })
);

setTimeout(() => {
  const subscription = source$.subscribe({
    next: (str) => {
      console.log("after 2s - observer2: ", str);
    },
    complete: () => {
      console.log("complete 2");
    },
  });
  // unsubscibe 之后，subscription 就无效了，（我打了句废话）
  subscription.unsubscribe()
}, 2000);

source$.subscribe({
  next: (str) => {
    console.log("observer1: ", str);
  },
  complete: () => {
    console.log("complete 1");
  },
});
