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

import { expect } from "chai";
import { TAI64 } from "../src/TAI64";

describe("TAI64", () => {
  describe("now", () => {
    it("should return the TAI64 corresponding to current time", () => {
      const tai64now = TAI64.now();

      expect(tai64now).to.be.not.undefined;
    });
  });

  describe("fromHexString", () => {
    it("should return the TAI64 corresponding to the given hexadecimal string", () => {
      const tai64EpochAsHexString = "4000000000000000";
      const tai64Epoch = TAI64.fromHexString(tai64EpochAsHexString);

      expect(tai64Epoch).to.be.eql(TAI64.EPOCH);
    });

    it("should throw a RangeError if value is greater than 2^63-1", () => {
      const hexString = "7fffffffffffffff"; // 2^63
      const fromHexString = () => TAI64.fromHexString(hexString);

      expect(fromHexString).to.throw(RangeError);
    });

    it("should throw a RangeError if value is lower than 0", () => {
      const hexString = "ffffffffffffffff"; // 0
      const fromHexString = () => TAI64.fromHexString(hexString);

      expect(fromHexString).to.throw(RangeError);
    });
  });

  describe("fromUnix", () => {
    it("should return the TAI64 corresponding to the given UNIX timestamp", () => {
      const tai64EpochAsDate = new Date("01 Jan 1970 00:00:00 UTC");
      const tai64EpochAsUnixTimestamp = tai64EpochAsDate.getTime();
      const tai64Epoch = TAI64.fromUnix(tai64EpochAsUnixTimestamp);

      expect(tai64Epoch).to.be.eql(TAI64.EPOCH);
    });
  });

  describe("fromByteArray", () => {
    it("should return the TAI64 corresponding to the given byte array", () => {
      const tai64EpochAsByteArray = [64, 0, 0, 0, 0, 0, 0, 0];
      const tai64Epoch = TAI64.fromByteArray(tai64EpochAsByteArray);

      expect(tai64Epoch).to.be.eql(TAI64.EPOCH);
    });

    it("should throw a RangeError if value is greater than 2^63-1", () => {
      const byteArray = [127, 255, 255, 255, 255, 255, 255, 255]; // 2^63
      const fromByteArray = () => TAI64.fromByteArray(byteArray);

      expect(fromByteArray).to.throw(RangeError);
    });

    it("should throw a RangeError if value is lower than 0", () => {
      const byteArray = [255, 255, 255, 255, 255, 255, 255, 255]; // 0
      const fromByteArray = () => TAI64.fromByteArray(byteArray);

      expect(fromByteArray).to.throw(RangeError);
    });
  });

  describe("isAfter", () => {
    it("should return true if TAI64 is after given TAI64", () => {
      const now = TAI64.now();
      const isAfter = now.isAfter(TAI64.EPOCH);

      expect(isAfter).to.be.eql(true);
    });

    it("should return false if TAI64 is before given TAI64", () => {
      const now = TAI64.now();
      const isAfter = TAI64.EPOCH.isAfter(now);

      expect(isAfter).to.be.eql(false);
    });

    it("should return false if TAI64 is equal to given TAI64", () => {
      const now = TAI64.now();
      const isAfter = now.isAfter(now);

      expect(isAfter).to.be.eql(false);
    });
  });

  describe("isBefore", () => {
    it("should return true if TAI64 is before given TAI64", () => {
      const now = TAI64.now();
      const isBefore = TAI64.EPOCH.isBefore(now);

      expect(isBefore).to.be.eql(true);
    });

    it("should return false if TAI64 is after given TAI64", () => {
      const now = TAI64.now();
      const isBefore = now.isBefore(TAI64.EPOCH);

      expect(isBefore).to.be.eql(false);
    });

    it("should return false if TAI64 is equal to given TAI64", () => {
      const now = TAI64.now();
      const isBefore = now.isBefore(now);

      expect(isBefore).to.be.eql(false);
    });
  });

  describe("isEqual", () => {
    it("should return true if TAI64 is equal to given TAI64", () => {
      const now = TAI64.now();
      const isEqual = now.isEqual(now);

      expect(isEqual).to.be.eql(true);
    });

    it("should return false if TAI64 is after given TAI64", () => {
      const now = TAI64.now();
      const isEqual = now.isEqual(TAI64.EPOCH);

      expect(isEqual).to.be.eql(false);
    });

    it("should return false if TAI64 is before given TAI64", () => {
      const now = TAI64.now();
      const isEqual = TAI64.EPOCH.isEqual(now);

      expect(isEqual).to.be.eql(false);
    });
  });

  describe("compareTo", () => {
    it("should return -1 if TAI64 is before the given TAI64", () => {
      const now = TAI64.now();
      const result = TAI64.EPOCH.compareTo(now);

      expect(result).to.be.eql(-1);
    });

    it("should return 1 if TAI64 is after the given TAI64", () => {
      const now = TAI64.now();
      const result = now.compareTo(TAI64.EPOCH);

      expect(result).to.be.eql(1);
    });

    it("should return 0 if TAI64 is equal to the given TAI64", () => {
      const now = TAI64.now();
      const result = now.compareTo(now);

      expect(result).to.be.eql(0);
    });
  });

  describe("toByteArray", () => {
    it("should return the byte array representation", () => {
      const tai64EpochAsByteArray = [64, 0, 0, 0, 0, 0, 0, 0];

      expect(TAI64.EPOCH.toByteArray()).to.be.eql(tai64EpochAsByteArray);
    });
  });

  describe("toHexString", () => {
    it("should return the hexadecimal string representation", () => {
      const tai64EpochAsHexString = "4000000000000000";

      expect(TAI64.EPOCH.toHexString()).to.be.eql(tai64EpochAsHexString);
    });
  });

  describe("toString", () => {
    it("should return the hexadecimal string representation", () => {
      const tai64EpochAsHexString = "4000000000000000";

      expect(TAI64.EPOCH.toString()).to.be.eql(tai64EpochAsHexString);
    });
  });
});
