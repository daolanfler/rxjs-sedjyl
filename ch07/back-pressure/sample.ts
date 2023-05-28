import {
  fromEvent,
  map,
  sample,
  timer,
  interval,
  take,
  concatWith,
  sampleTime
} from 'rxjs';

const notifier$ = fromEvent(document.querySelector('#sample'), 'click');
const tick$ = timer(0, 10).pipe(map((x) => x * 10));
const sample$ = tick$.pipe(sample(notifier$));

sample$.subscribe((value) => {
  (document.querySelector('#text') as HTMLDivElement).innerText = value + '';
});


const source$2 = interval(500).pipe(
  take(2),
  map(() => 'A'),
  concatWith(
    interval(1000).pipe(
      take(3),
      map(() => 'B')
    )
  ),
  concatWith(
    interval(500).pipe(
      take(3),
      map(() => 'C')
    )
  )
);

// 采样
// source$2.pipe(sampleTime(800)).subscribe(console.log)

source$2.pipe(sampleTime(500)).subscribe(console.log)