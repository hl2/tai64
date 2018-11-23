/**
 * Copyright (c) 2018 hl2, https://hl2.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import Long from "long";
import { LabelRangeError } from "./LabelRangeError";
import { getLeapSeconds } from "./LeapSeconds";

class TAI64 {
  static readonly EPOCH = new TAI64(Long.MAX_VALUE.shiftRight(1).add(1));

  static now() {
    const unixTimestamp = Math.floor(Date.now() / 1000);

    return TAI64.fromUnixTimestamp(unixTimestamp);
  }

  static fromUnixTimestamp(unixTimestamp: number) {
    const leapSeconds = getLeapSeconds(unixTimestamp);
    const label = TAI64.EPOCH.label.add(unixTimestamp + leapSeconds);

    return new TAI64(label);
  }

  static fromHexString(hexString: string) {
    const label = Long.fromString(hexString, false, 16);

    return new TAI64(label);
  }

  static fromByteArray(bytes: number[]) {
    const label = Long.fromBytes(bytes, false);

    return new TAI64(label);
  }

  private readonly label: Long;

  private constructor(label: Long) {
    if (label.lt(Long.ZERO) || label.gte(Long.MAX_VALUE)) {
      throw new LabelRangeError();
    }

    this.label = label;
  }

  isAfter(other: TAI64) {
    return this.label.gt(other.label);
  }

  isBefore(other: TAI64) {
    return this.label.lt(other.label);
  }

  isEqual(other: TAI64) {
    return this.label.eq(other.label);
  }

  toHexString() {
    return this.label.toString(16);
  }

  toByteArray() {
    return this.label.toBytes();
  }
}

const tai64 = (value?: string | number | number[]) => {
  if (typeof value === "string") {
    return TAI64.fromHexString(value);
  } else if (typeof value === "number") {
    return TAI64.fromUnixTimestamp(value);
  } else if (Array.isArray(value)) {
    return TAI64.fromByteArray(value);
  }

  return TAI64.now();
};

export { tai64, TAI64 };
