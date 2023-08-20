const pool = require('../utils/pool');

module.exports = class Item {
  id;
  created_at;
  title;
  body;
  completed;
  user_id;
  constructor({ id, created_at, title, body, completed, user_id }) {
    this.id = id;
    this.created_at = created_at;
    this.title = title;
    this.body = body;
    this.completed = completed;
    this.user_id = user_id;
  }

  static async insertItem({ title, body, completed, user_id }) {
    const { rows } = await pool.query(
      `
      INSERT INTO items (title, body, completed, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
      [title, body, completed, user_id]
    );
    return new Item(rows[0]);
  }

  static async updateItemById(id, attrs) {
    const item = await Item.getById(id);
    if (!item) return null;
    const { created_at, title, body, completed  } = { ...Item, ...attrs };
    const { rows } = await pool.query(
      `
      UPDATE items
      SET created_at=$2, title=$3, body=$4, completed=$5
      WHERE id=$1 RETURNING *`,
      [id, title, body, completed, created_at]
    );
    if (!rows[0]) null;
    return new Item(rows[0]);
  }

  static async getItemById(id) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM items
      WHERE id=$1
      `,
      [id]
    );
    if (!rows[0]) {
      return null;
    }
    return new Item(rows[0]);
  }

  static async getAllItems(user_id) {
    const { rows } = await pool.query(
      'SELECT * FROM items WHERE user_id = $1 ORDER BY created_at DESC',
      [user_id]
    );
    return rows.map((item) => new Item(item));
  }

  static async deleteItem(id) {
    const { rows } = await pool.query(
      'DELETE FROM items WHERE id = $1 RETURNING *',
      [id]
    );
    return new Item(rows[0]);
  }
};
