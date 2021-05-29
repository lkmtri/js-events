## Tiny pubsub library in JS
### Install
```
npm install @suinegmai/js-events

or

yarn add @suinegmai/js-events
```
### Usage

```typescript
import EventEmitter from '@suinegmai/js-events'

type Event = {
  mount: string
  update: {
    state: number
  }
  unmount: number
}

const ev = eventEmitter<Event>()

const onMount = (...args) => console.log('mount: ', ...args)
const onUpdate = (...args) => console.log('update: ', ...args)
const onUnmount = (...args) => console.log('unmount: ', ...args)

//Subscribe to 'mount' event, but only trigger the callback once.
ev.once('mount', onMount)

//Subscribe to 'update' event, the callback is trigger for every 'update' event
ev.on('update', onUpdate)

//Subscribe to 'unmount' event, but only trigger the callback once.
ev.once('unmount', onUnmount)


ev.emit('mount', 'First mount')
ev.emit('mount', 'Second mount')
ev.emit('update', { state: 1 })
ev.emit('update', { state: 2 })
ev.emit('unmount', 0)

//Unsubscribe onUpdate
ev.off('update', onUpdate)

//Console output
mount: First mount
update: { state: 1 }
update: { state: 2 }
unmount: 0
```