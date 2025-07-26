import 'reflect-metadata';

import { UserAdapter } from '@api/adapters/user.adapter';
import type { MasterAccount } from '@prisma/generated';
import type { UserModelDto } from '@shared/dto/models/user.model.dto';

describe('UserAdapter', () => {
  let adapter: UserAdapter;

  beforeEach(() => {
    adapter = new UserAdapter();
  });

  describe('getUsersFromMasterAccounts()', () => {
    it('should map an array of MasterAccount to UserModelDto[]', () => {
      const masterAccounts: MasterAccount[] = [
        {
          id: '1',
          email: 'alice@example.com',
          password: 'secret1',
          createdAt: new Date('2025-01-01T00:00:00.000Z'),
        },
        {
          id: '2',
          email: 'bob@example.com',
          password: 'secret2',
          createdAt: new Date('2025-02-02T00:00:00.000Z'),
        },
      ];

      const expected: UserModelDto[] = [
        {
          id: '1',
          email: 'alice@example.com',
          password: 'secret1',
          createdAt: new Date('2025-01-01T00:00:00.000Z'),
        },
        {
          id: '2',
          email: 'bob@example.com',
          password: 'secret2',
          createdAt: new Date('2025-02-02T00:00:00.000Z'),
        },
      ];

      const result: UserModelDto[] =
        adapter.getUsersFromMasterAccounts(masterAccounts);
      expect(result).toEqual(expected);
    });

    it('should return an empty array when passed an empty array', () => {
      const result: UserModelDto[] = adapter.getUsersFromMasterAccounts([]);
      expect(result).toEqual([]);
    });
  });
});
