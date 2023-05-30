import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import { createUserData, hash } from "../middleware/auth/hash.js";

const registerRegularRoutes = (app) => {

  app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (!user) {
        return res.status(401).json({ error: "No user found" });
      }
      if (user) {
        const givenPassword = hash(user, req.body.password);
        if (givenPassword !== user.password) {
          return res.status(401).json({ error: "Invalid username or password" });
        }
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN_HOURS * 60 * 60 }
      );

      delete user.password;
      delete user.salt;
      delete user.saltParam;
      return res.json({ token, ...user });
    })(req, res, next);
  });

  app.post("/register", async (req, res) => {
    console.log(req.body);
    const { username, password, email } = req.body;
    try {
      // Check if the username already exists
      const query = {
        text: "SELECT * FROM users WHERE username = $1",
        values: [username],
      };
      const { rows } = await pool.query(query);
      const existingUser = rows[0];

      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }
      console.log('2')
      // Create a new user
      const newUser = createUserData({ username, password, email });

      // Insert the user into the database
      const insertQuery = {
        text: "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
        values: [newUser.username, newUser.password, newUser.email],
      };
      const result = await pool.query(insertQuery);
      const registeredUser = result.rows[0];
      console.log('3')
      // Generate a new token for the registered user
      const token = jwt.sign({ id: registeredUser.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN_HOURS * 60,
      });

      delete registeredUser.password;
      delete registeredUser.salt;
      delete registeredUser.saltParam;
      res.json({ token, ...registeredUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/houses", async (req, res) => {
    console.log('houses')
    const query = "SELECT * FROM houses";
    const { rows } = await pool.query(query);
    res.json(rows);
    console.log(rows)
  });


  app.get("/", async (req, res) => {
    console.log('houses')
    const query = "SELECT * FROM houses";
    const { rows } = await pool.query(query);
    res.json(rows);
    console.log(rows)
  });
};


const registerAdminRoutes = (app) => {
  const adminRouter = Router();

  adminRouter.use(passport.authenticate("jwt", { session: false, failWithError: true }));

};

const registerRoutes = async (app) => {
  registerRegularRoutes(app);
  registerAdminRoutes(app);

  // Custom error handler middleware to handle JWT authentication errors
  app.use((err, req, res, next) => {
    if (err.name === "AuthenticationError") {
      res.status(401).json({ error: "Token expired" });
    } else {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

export { registerRoutes };