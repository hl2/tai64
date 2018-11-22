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
import { getLeapSeconds } from "../src/LeapSeconds";

describe("LeapSeconds", () => {
  const getTimeInSeconds = (date: Date) => Math.floor(date.getTime() / 1000);

  describe("getLeapSeconds", () => {
    it("should return no leap seconds if timestamp is before 01 Jan 1972, 00:00 UTC", () => {
      const moonLanding = new Date("20 July 1969 00:20:18 UTC");
      const timestamp = getTimeInSeconds(moonLanding);
      const leapSeconds = getLeapSeconds(timestamp);

      expect(leapSeconds).to.be.eql(0);
    });

    it("should return 23 leap seconds if timestamp is before 01 Jan 1988, 00:00 UTC", () => {
      const date = new Date("31 Dec 1987, 23:59 UTC");
      const timestamp = getTimeInSeconds(date);
      const leapSeconds = getLeapSeconds(timestamp);

      expect(leapSeconds).to.be.eql(23);
    });

    it("should return 24 leap seconds if timestamp is equal to 01 Jan 1988, 00:00 UTC", () => {
      const date = new Date("01 Jan 1988, 00:00 UTC");
      const timestamp = getTimeInSeconds(date);
      const leapSeconds = getLeapSeconds(timestamp);

      expect(leapSeconds).to.be.eql(24);
    });

    it("should return 24 leap seconds if timestamp is after 01 Jan 1988, 00:00 UTC", () => {
      const date = new Date("01 Jan 1988, 00:01 UTC");
      const timestamp = getTimeInSeconds(date);
      const leapSeconds = getLeapSeconds(timestamp);

      expect(leapSeconds).to.be.eql(24);
    });

    it("should return 37 leap seconds if timestamp is after 01 Jan 2017, 00:00 UTC", () => {
      const date = new Date("01 Jan 2017, 00:00 UTC");
      const timestamp = getTimeInSeconds(date);
      const leapSeconds = getLeapSeconds(timestamp);

      expect(leapSeconds).to.be.eql(37);
    });
  });
});
