import { expect, test } from 'vitest';
import { formatTime, formatMilliSeconds } from '../../helpers/formatTime';

test('formatTime formats seconds in number to MM:SS in string', () => {
    expect(formatTime(90)).toBe('01:30');
    expect(formatTime(5)).toBe('00:05');
    expect(formatTime(231)).toBe('03:51');
});

test('formatMilliSeconds formats milliseconds in number to MM:SS in string', () => {
    expect(formatMilliSeconds(9000)).toBe('00:09');
    expect(formatMilliSeconds(50000)).toBe('00:50');
    expect(formatMilliSeconds(230000)).toBe('03:50');
    expect(formatMilliSeconds(347872)).toBe('05:48');
});
