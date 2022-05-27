import { calcPercentage } from './calc-percentage';

describe('function calcPercentage', () => {
  it('should return right string value', () => {
    expect(calcPercentage(100, 100)).toBe('100.00%');
    expect(calcPercentage(0, 100)).toBe('0.00%');
    expect(calcPercentage(100, 1000)).toBe('10.00%');
  });
});
