import { timer, withLatestFrom } from 'rxjs';

const source$1 = timer(0, 2000);
const source$2 = timer(500, 1000);
source$1
  .pipe(
    withLatestFrom(source$2, (x, y) => {
      return `${x * 100} - ${y}`;
    })
  )
  .subscribe(console.log);
