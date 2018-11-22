# TAI64

⚛️ Typescript implementation of TAI64 timestamps for [Node.js](https://nodejs.org/en/) and the browser.

> TAI refers to International Atomic Time (Temps Atomique International in French), the current international real-time standard. One TAI second is defined as the duration of `9192631770` periods of the radiation corresponding to the transition between the two hyperfine levels of the ground state of the cesium atom.

https://cr.yp.to/libtai/tai64.html#tai64

## Getting started

1. Installation

```shell
npm install --save tai64
```

2. Usage

```javascript
import { tai64, TAI64 } from "tai64";

const now = tai64();
const fromUnix: TAI64 = tai64(new Date());

console.log(now.toHexString()); // TAI64 label as Hex string
console.log(now.toByteArray()); // TAI64 label as byte array
```

## Implementation details (TODO)

- Types
- Immutability
- No TAI64n

## Further readings

- [UTC, TAI, and UNIX time](https://cr.yp.to/libtai/tai64.html)
- [What’s this whole TAI64 thing about?](http://dyscour.se/post/12679668746/using-tai64-for-logging)
- [Leap second](https://en.wikipedia.org/wiki/Leap_second)

## License

TAI64 is [MIT Licensed](./LICENSE.md).
