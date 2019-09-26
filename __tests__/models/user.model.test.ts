import pool from '../../src/core/db';
import UserModel from '../../src/models/user.model';

function mockResult() {
  return {
    rows: [
    {
      id: 2,
      name: 'Eduardo Chaves',
      email: 'eduardo.chaves@ibm.com',
      created_on: '2019-09-26T09:37:57.707Z',
    },
    {
      id: 3,
      name: 'Salomão',
      email: 'raibersa@br.ibm.com',
      created_on: '2019-09-26T09:50:46.146Z',
    },
    {
      id: 4,
      name: 'Diogo Tocci',
      email: 'dtocci@br.ibm.com',
      created_on: '2019-09-26T09:51:14.602Z',
    },
    ],
  };
}

describe('UserModel', () => {
  describe('When List method is called', () => {
    it('should return a list of users', async () => {
      let query;
      pool.query = jest
        .fn()
        .mockImplementation((mockQuery) => {
          query = mockQuery;
          return mockResult();
        });

      const result = await UserModel.list();

      expect(query).toMatchSnapshot();
      expect(result.length).toBe(3);
    });

    it('should return a list of users', async () => {
      pool.query = jest
        .fn()
        .mockImplementation(() => {
          return {};
        });

      const result = await UserModel.list();

      expect(result.length).toBe(0);
    });

    it('should return status false when an exception happens', async () => {
      try {
        pool.query = jest
        .fn()
        .mockImplementation(() => {
          throw new Error('Mock Error');
        });

        const result = await UserModel.list();
      } catch (err) {
        expect(err.message).toBe('Mock Error');
      }
    });
  });
});
