import EventEmitter from 'node:events';

const emitter = new EventEmitter();

// Add an event handler
emitter.on('hello', (message) => {
  console.log(`Event handled: ${message}`);
});

// Emit the event after a 3 second delay
setTimeout(() => {
  emitter.emit('hello', 'This is a message from the event');
}, 3000);
