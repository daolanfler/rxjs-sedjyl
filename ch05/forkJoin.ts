import {forkJoin, interval, map, take} from 'rxjs'

const source$1 = interval(1000).pipe(map(x => x + 'a'), take(1))
const source$2 = interval(1000).pipe(map(x => x + 'b'), take(3))
const joined$ = forkJoin(source$1, source$2);

joined$.subscribe(console.log, null, () => {
  console.log('complete');
  
})