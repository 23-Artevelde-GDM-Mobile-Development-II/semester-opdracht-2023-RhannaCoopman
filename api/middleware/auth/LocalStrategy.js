import { Strategy as LocalStrategy } from "passport-local";
import pool from "../../db.js";

const db = pool;

export default new LocalStrategy(
  { usernameField: "username", passwordField: "password" },
  async (username, password, done) => {
    try {
      const query = {
        text: "SELECT * FROM users WHERE username = $1",
        values: [username],
      };
      const { rows } = await db.query(query);
      let user = rows[0];

      if (!user) {
        const insertQuery = {
          text: "INSERT INTO users (username) VALUES ($1) RETURNING *",
          values: [username],
        };
        const result = await db.query(insertQuery);
        user = result.rows[0];
        console.log(user);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
