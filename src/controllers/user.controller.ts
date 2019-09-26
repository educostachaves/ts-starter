import { Request, Response } from 'express';
import UserModel from '../models/user.model';

class UserController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const data = await UserModel.list();

      if (data.length === 0) {
        throw new Error('Users were not found');
      }

      res.json({
        data,
        status: true,
      });
    } catch (err) {
      res.json({
        message: err.message,
        status: false,
      });
    }
  }
}

export default new UserController();
