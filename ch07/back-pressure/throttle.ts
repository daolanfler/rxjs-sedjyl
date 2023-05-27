import { debounce, interval, throttle, timer } from 'rxjs';

const source$ = interval(1000);
const durationSelector = (value: number) => {
  console.log('# call durationSelector with ' + `${value}`);
  return timer(value % 3 == 0 ? 2000 : 900);
};

// const result$ = source$.pipe(throttle(durationSelector, { trailing: true }));
// result$.subscribe(console.log, null, () => {
//   console.log('complete');
// });


const result$ = source$.pipe(debounce(durationSelector));
result$.subscribe(console.log, null, () => {
  console.log('complete');
});
