import { Observable, Subject } from "rxjs";

export const makeHot = (cold$: Observable<any>) => {
    const subject = new Subject();
    cold$.subscribe(subject);
    // return subject
    return new Observable((observer) => {
        subject.subscribe(observer);
    })
}