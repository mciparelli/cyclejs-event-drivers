# cyclejs-event-drivers

> List of event drivers for Cycle.js

## Install

```bash
npm install cyclejs-event-drivers --save
```

## Usage

```javascript
import Cycle from '@cycle/core';
import { div, h1, makeDOMDriver } from '@cycle/dom';
import { preventDefaultDriver, stopPropagationDriver } from 'cyclejs-event-drivers';

function main() {
  // ...
  return {
    preventDefault: eventsToPrevent$,
    stopPropagation: eventsToStopPropagation$
  };
}

Cycle.run(main, {
  preventDefault: preventDefaultDriver,
  stopPropagation: stopPropagationDriver
});
```

## License

MIT
