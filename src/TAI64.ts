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

// TODO: validation and error handling
class TAI64 {
  static readonly EPOCH = new TAI64(Long.MAX_VALUE.shiftRight(1).add(1));

  static now() {
    const now = new Date();

    return TAI64.fromDate(now);
  }

  static fromDate(date: Date) {
    const timestamp = Math.floor(date.getTime() / 1000);

    return TAI64.EPOCH.add(timestamp + getLeapSeconds(timestamp));
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

  add(seconds: number) {
    const secondsAsLong = Long.fromNumber(seconds);
    const newLabel = this.label.add(secondsAsLong);

    return new TAI64(newLabel);
  }

  toHexString() {
    return this.label.toString(16);
  }

  toByteArray() {
    return this.label.toBytes();
  }
}

const tai64 = (value?: string | Date | number[]) => {
  if (value instanceof Date) {
    return TAI64.fromDate(value);
  } else if (value instanceof Array) {
    return TAI64.fromByteArray(value);
  } else if (typeof value === "string") {
    return TAI64.fromHexString(value);
  }

  return TAI64.now();
};

export { tai64, TAI64 };
