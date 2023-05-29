import { groupBy, interval } from "rxjs";

const intervalStream$ = interval(1000);
const groupByStream$ = intervalStream$.pipe(groupBy((val) => val % 2));

groupByStream$.subscribe(console.log)