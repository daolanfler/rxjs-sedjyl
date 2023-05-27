import { count, map, min, of, pipe, range, reduce } from 'rxjs';

// const source$ = of(
//   { name: 'RxJS', year: 2011 },
//   { name: 'React', year: 2013 },
//   { name: 'Redux', year: 2015 }
// );

// source$.pipe(min((a, b) => a.year - b.year)).subscribe(console.log);

// comparer:
// const arr = [3, 2, 5, 1, 0, 7];
// console.log([...arr].sort()); // 默认从小到大
// console.log([...arr].sort((a, b) => b - a)); // compareFn, if return positive, a > b, if return negative, a < b, else a == b

const source$ = range(1, 100).pipe(reduce((acc, current) => acc + current));

source$.subscribe(console.log);


const averageReducer = () => {
  return pipe(
    reduce(
      (acc: { sum: number; count: number }, current: number) => {
        return {
          sum: acc.sum + current,
          count: acc.count + 1,
        };
      },
      { sum: 0, count: 0 }
    ),
    map((val) => val.sum / val.count)
  );
};

range(1, 100).pipe(averageReducer()).subscribe(console.log);
