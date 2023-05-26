import { from } from "rxjs";

const source$ = from(
  // Promise.resolve().then(() => {
  //   console.log('resolved');
  // })
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hello")
    }, 1000)
  })
);

setTimeout(() => {
  source$.subscribe((str) => {
    console.log('shit after 2s', str)
  })
}, 2000)

source$.subscribe((str) => {
  console.log('shit', str)
})