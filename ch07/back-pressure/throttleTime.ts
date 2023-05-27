import { interval, throttleTime } from 'rxjs';

const source$ = interval(1000);
source$
  .pipe(throttleTime(2000, null, { leading: true, trailing: true }))
  .subscribe(console.log);
