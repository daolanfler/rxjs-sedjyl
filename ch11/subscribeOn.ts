import { Observable, asapScheduler, subscribeOn } from "rxjs";

const source$ = new Observable((observer) => {
    console.log("on subscribe");
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
    return () => {
        console.log("on unsubscribe");
    }
})

// console.log("before subscribe");
// const timeStart = Date.now();
// const subscription = source$.subscribe({
//     next: (val) => {
//         console.log(val)
//     },
//     complete: () => {
//         console.log("complete");
//     }
// })
// console.log("after subscribe");

console.log("before subscribe");

// 订阅是异步执行的, on subscribe 在 before subscribe 之后执行

source$.pipe(subscribeOn(asapScheduler)).subscribe({
    next: (val) => {
        console.log(val)
    },
    complete: () => {
        console.log("complete");
    }
})
console.log("after subscribe");
