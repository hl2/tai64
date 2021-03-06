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

/**
 * See https://www.ietf.org/timezones/data/leap-seconds.list.
 *
 * The NTP timestamps are in units of seconds since the NTP epoch, which is 1 January 1900, 00:00:00. The UNIX timestamp
 * corresponding to the NTP timestamp X can be computed with the following formula:
 *
 * X - 2208988800
 *
 * The number 2208988800 represents the NTP timestamp for the UNIX epoch, which is 1 January 1970, 00:00:00, computed with
 * the following formula (70 * 365 + 17) * 86400.
 */
const leapSeconds: ReadonlyArray<[number, number]> = [
  [1483228800, 37],
  [1435708800, 36],
  [1341100800, 35],
  [1230768000, 34],
  [1136073600, 33],
  [915148800, 32],
  [867715200, 31],
  [820454400, 30],
  [773020800, 29],
  [741484800, 28],
  [709948800, 27],
  [662688000, 26],
  [631152000, 25],
  [567993600, 24],
  [489024000, 23],
  [425865600, 22],
  [394329600, 21],
  [362793600, 20],
  [315532800, 19],
  [283996800, 18],
  [252460800, 17],
  [220924800, 16],
  [189302400, 15],
  [157766400, 14],
  [126230400, 13],
  [94694400, 12],
  [78796800, 11],
  [63072000, 10],
];

/**
 * Add leap seconds to the given UNIX timestamp.
 *
 * @param timestamp - The UNIX timestamp in seconds
 * @returns a timestamp with leap seconds added
 */
const addLeapSeconds = (timestamp: number) => {
  const leapSecond = leapSeconds.find(([ts]) => timestamp >= ts);
  return timestamp + (leapSecond ? leapSecond[1] : 0);
};

/**
 * Remove leap seconds from the given timestamp including the leap seconds.
 *
 * @param timestamp - The timestamp in seconds including leap seconds
 * @returns the corresponding UNIX timestamp
 */
const removeLeapSeconds = (timestamp: number) => {
  const leapSecond = leapSeconds.find(
    ([ts, offset]) => timestamp - offset >= ts
  );
  return timestamp - (leapSecond ? leapSecond[1] : 0);
};

export { addLeapSeconds, removeLeapSeconds };
