
import pool from '../core/db';

class UserModel {
  public async list(): Promise<any> {
    const query = `
      SELECT * FROM users Where 1 = 1;
    `;

    try {
      const result: any = await pool.query(query);

      if (!result.rows || result.rows.length === 0) {
        return [];
      }

      return result.rows;
    } catch (err) {
      return err;
    }
  }
}

export default new UserModel();
