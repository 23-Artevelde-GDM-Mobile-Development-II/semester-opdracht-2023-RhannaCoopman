import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import pool from "../../db.js";

const db = pool;

export default new JwtStrategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    expiresIn: process.env.JWT_EXPIRES_IN_HOURS * 60 * 60,
  },
  async (payload, done) => {
    try {
      // check if user with id exists
      const query = {
        text: "SELECT * FROM users WHERE id = $1",
        values: [payload.id],
      };
      const { rows } = await db.query(query);
      const user = rows[0];

      if (user) {
        return done(null, user);
      } else {
        // User not found
        return done(null, false, { message: "Token expired" });
      }
    } catch (error) {
      console.log(error);
      return done(error);
    }
  }
);
