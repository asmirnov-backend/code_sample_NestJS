import { SpendType } from '@prisma/client';

import { getSpendData } from './get-spend-data';

describe('function getSpendData', () => {
  it('SpendType = Hide', () => {
    expect(
      getSpendData(1000, [{ spendType: SpendType.Hide, spendRate: 0.0 }]),
    ).toEqual({
      spend: '0',
      spendVal: 'NA',
    });
  });

  it('SpendType = CPM', () => {
    expect(
      getSpendData(1000, [{ spendType: SpendType.CPM, spendRate: 1.0 }]),
    ).toEqual({
      spend: '1.00',
      spendVal: '$1.00',
    });
  });
});
