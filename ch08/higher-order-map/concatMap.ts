import './logo.css'
import { concatAll, concatMap, fromEvent, interval, map, merge, mergeWith, take, takeUntil } from "rxjs";

// const project = (v: number, index: number) => {
//     return interval(100).pipe(take(5))
// }

// const source$ = interval(200)
// // const result$ = source$.pipe(map(project), concatAll());

// const result$ = source$.pipe(concatMap(project));

// result$.subscribe(console.log)



/** Drag example */

const logo = document.querySelector("#logo") as HTMLDivElement;

const mouseDown$ = fromEvent<MouseEvent>(logo, "mousedown");
const mouseMove$ = fromEvent<MouseEvent>(logo, "mousemove");
const mouseUp$ = fromEvent<MouseEvent>(logo, "mouseup");
const mouseOut$ = fromEvent<MouseEvent>(logo, "mouseout");

const drag$ = mouseDown$.pipe(
    concatMap((startEvent: MouseEvent) => {
        const initialLeft = logo.offsetLeft;
        const initialTop = logo.offsetTop;
        return mouseMove$.pipe(
            takeUntil(mouseUp$.pipe(mergeWith(mouseOut$))),
            map((moveEvent: MouseEvent) => {
                return {
                    left: initialLeft + moveEvent.clientX - startEvent.clientX,
                    top: initialTop + moveEvent.clientY - startEvent.clientY
                }
            })
        )
    })
)

drag$.subscribe({
    next: (pos) => {
        console.log(pos);
        
        logo.style.left = `${pos.left}px`;
        logo.style.top = `${pos.top}px`;
    }
})