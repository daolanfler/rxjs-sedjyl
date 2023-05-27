import { fromEvent, map, interval, take, combineLatestAll } from 'rxjs';

const clicks = fromEvent(document, 'click');
const higherOrder = clicks.pipe(
  map(() => interval(Math.random() * 2000).pipe(take(3))),
  take(2)
);
const result = higherOrder.pipe(combineLatestAll());

result.subscribe((x) => console.log(x));

/**
 * 1. clicks 只会 emit 2次，之后就 complete & remove the click listener
 * 2. refresh page, `click` and wait like 6s longer then `click` again
 * the output is like this:
 * [2,0]
 * [2,1]
 * [2,2]
 * e---------------e|
 *    0--1--2|
 *                    0--1--2|
 * first wait the outer Observale completes
 * then with the combineLatest strategy, result has to wait
 * until all the inner Observales to have a `latest` emit-value
 * to start, thus the output
 *
 */
