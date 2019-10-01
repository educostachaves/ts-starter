const MockExpressRequest = require('mock-express-request');
const MockExpressResponse = require('mock-express-response');

import UserController from '../../src/controllers/user.controller';
import UserModel from '../../src/models/user.model';

jest.mock('../../src/models/user.model', () => {
  return {
    list: () => {
      return mockResult();
    },
  };
});

function mockResult() {
  return [
    {
      id: 2,
      name: 'Eduardo Chaves',
      email: 'eduardo@ibm.com',
      created_on: '2019-09-26T09:37:57.707Z',
    },
    {
      id: 3,
      name: 'Salomão',
      email: 'salomao@ibm.com',
      created_on: '2019-09-26T09:50:46.146Z',
    },
    {
      id: 4,
      name: 'Diogo Tocci',
      email: 'diogo@ibm.com',
      created_on: '2019-09-26T09:51:14.602Z',
    },
  ];
}

describe('UserController', () => {
  describe('When List method is called', () => {
    it('should return a list of users', async () => {
      const req: any = new MockExpressRequest();
      const res: any = new MockExpressResponse();

      await UserController.list(req, res);
      const result = res._getJSON();

      expect(result.status).toBe(true);
      expect(result.data.length).toBe(3);
    });

    it('should return status false and the respective error message', async () => {
      UserModel.list = jest.fn().mockImplementation(() => {
        return [];
      });
      const req: any = new MockExpressRequest();
      const res: any = new MockExpressResponse();

      await UserController.list(req, res);
      const result = res._getJSON();

      expect(result.status).toBe(false);
      expect(result.message).toBe('Users were not found');
    });

    it('should return status false when an exception happens', async () => {
      UserModel.list = jest.fn().mockImplementation(() => {
        throw new Error('Error Mock');
      });
      const req: any = new MockExpressRequest();
      const res: any = new MockExpressResponse();

      await UserController.list(req, res);
      const result = res._getJSON();

      expect(result.status).toBe(false);
      expect(result.message).toBe('Error Mock');
    });
  });
});
