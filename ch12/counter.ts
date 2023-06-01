import { fromEvent, map, merge, scan } from "rxjs";

const body = document.querySelector("body") as HTMLBodyElement;
const firstChild = body.firstChild;

const div = document.createElement("div");

const button = div.appendChild(document.createElement("button"));
button.id = "plus";
button.textContent = "plus";

const button2 = div.appendChild(document.createElement("button"));
button2.id = "minus";
button2.textContent = "minus";
button2.style.marginLeft = "4px";

const span = div.appendChild(document.createElement("span"));
span.innerText = "0";
span.style.marginLeft = "4px";

body.insertBefore(div, firstChild);

export {};

const plus$ = fromEvent(button, "click");
const minus$ = fromEvent(button2, "click");

merge(plus$.pipe(map(() => 1)), minus$.pipe(map(() => -1)))
  .pipe(scan((acc, curr) => acc + curr, 0))
  .subscribe((val) => {
    span.innerText = val.toString();
    console.log(val);
    
  });
