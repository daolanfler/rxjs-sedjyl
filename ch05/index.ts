import { map, merge, timer } from 'rxjs';

const source$1 = timer(0, 1000).pipe(map((x) => x + 'A'));

const source$2 = timer(500, 1000).pipe(map((x) => x + 'B'));

// merge 属于是先到先得
merge(source$1, source$2).subscribe(console.log, null, () => {
  console.log('completed');
});
