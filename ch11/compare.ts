import { asapScheduler, asyncScheduler, queueScheduler } from "rxjs"

console.log('before schedule')

asyncScheduler.schedule(() =>{console.log('async')})
asapScheduler.schedule(() =>{console.log('asap')})
queueScheduler.schedule(() =>{console.log('queue')})

console.log('after schedule')
