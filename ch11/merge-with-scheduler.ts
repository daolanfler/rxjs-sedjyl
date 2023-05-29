import { asapScheduler, merge, observeOn, range } from "rxjs";

const source$1 = range(1, 3);
const source$2 = range(10, 3);
const source$ = merge(source$1, source$2, asapScheduler);

// console.log("before subscribe");

// source$.subscribe({
//     next: (val) => console.log(val),
//     complete: () => console.log("complete")
// })

// console.log("after subscribe");


console.log("before subscribe");
// obeserveOn 不影响上游数据产生的节奏
source$1.pipe(observeOn(asapScheduler)).subscribe({
    next: (val) => console.log(val),
    complete: () => console.log("complete")
})
console.log("after subscribe");

