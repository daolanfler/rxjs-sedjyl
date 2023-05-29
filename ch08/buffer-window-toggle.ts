import { timer, windowToggle } from "rxjs";

const source$ = timer(0, 1000);
const opening$ = timer(0, 4000);
const closingSelector = (value: number) => {
  return value % 2 === 0 ? timer(3000) : timer(1000);
};

source$.pipe(windowToggle(opening$, closingSelector)).forEach((ob) => {
  console.log("window opens");
  
  ob.subscribe({
    complete: () => {
      console.log("window closed");
    },
    next: console.log,
  });
});
