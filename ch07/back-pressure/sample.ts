import { fromEvent, map, sample, timer } from 'rxjs';

const notifier$ = fromEvent(document.querySelector('#sample'), 'click');
const tick$ = timer(0, 10).pipe(map((x) => x * 10));
const sample$ = tick$.pipe(sample(notifier$));

sample$.subscribe((value) => {
  (document.querySelector('#text') as HTMLDivElement).innerText = value + '';
});
