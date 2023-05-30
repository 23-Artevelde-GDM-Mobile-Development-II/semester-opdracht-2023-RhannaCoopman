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
      // Create a new user
      const newUser = createUserData({ username, password, email });

      // Insert the user into the database
      const insertQuery = {
        text: "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
        values: [newUser.username, newUser.password, newUser.email],
      };
      const result = await pool.query(insertQuery);
      const registeredUser = result.rows[0];

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
    const query = "SELECT * FROM houses";
    const { rows } = await pool.query(query);
    console.log(rows)
    res.json(rows);
    console.log(rows)


  });

  app.get("/house/:id", async (req, res) => {
    const id = req.params.id;

    try {
      // Retrieve house information from the database based on the id
      // Query inner joins tables with houses-table and searches where houses.id is the same as in the parameter.
      const query = {
        text: "SELECT houses.*, energylabel.name as energylabel, house_type.name as housetype, city.cityname as cityname, city.citycode as citycode, building_type.name as buildingtype, windowtypes.name as windowtype, state.name as state, status.name as status FROM houses INNER JOIN energylabel ON houses.energylabel_id = energylabel.id INNER JOIN house_type ON houses.house_type_id = house_type.id INNER JOIN city ON houses.city_id = city.id INNER JOIN building_type ON houses.buildings_id = building_type.id INNER JOIN windowtypes ON houses.windowtype_id = windowtypes.id INNER JOIN state ON houses.state_id = state.id INNER JOIN status ON houses.status_id = status.id WHERE houses.id = $1",
        values: [id],
      };
      const { rows } = await pool.query(query);
      const house = rows[0];
  
      // Check if a house with the provided id exists
      if (!house) {
        return res.status(404).json({ error: "House not found" });
      }
  
      // Send the house data as a JSON response
      res.json(house);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/contact/:id", async (req, res) => {
    const id = req.params.id;

    try {
      // Retrieve house information from the database based on the id to know to which realestate agent to send the message

      const query = {
        text: "SELECT * FROM houses WHERE id = $1",
        values: [id],
      };
      const { rows } = await pool.query(query);
      const house = rows[0];
  
      // Check if a house with the provided id exists
      if (!house) {
        return res.status(404).json({ error: "House not found" });
      }
  
      // Send the house data as a JSON response
      res.json(house);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }

  });

  app.post('/contact', async (req, res) => {
    try {
        
        const data = req.body

        const { rows } = await pool.query("INSERT INTO messages (sender_id, building_id, content, receiver_id, send_time) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
            data.sender_id,
            data.house_id,
            data.message,
            data.receiver_id,
            data.timestamp
        ])

        res.json(rows)

    } catch(err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

app.get("/profile/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Retrieve house information from the database based on the id
    // Query inner joins tables with houses-table and searches where houses.id is the same as in the parameter.
    const query = {
      text: "SELECT * FROM users WHERE id = $1",
      values: [id],
    };
    const { rows } = await pool.query(query);
    const user = rows[0];

    // Check if a house with the provided id exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send the house data as a JSON response
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/myprofile/:id", async (req, res) => {
  const id = req.params.id;


  try {
    // Retrieve house information from the database based on the id
    // Query inner joins tables with houses-table and searches where houses.id is the same as in the parameter.
    const query = {
      text: "SELECT * FROM users WHERE id = $1",
      values: [id],
    };
    const { rows } = await pool.query(query);
    const user = rows[0];

    // Check if a house with the provided id exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send the house data as a JSON response
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/mysavedbuildings/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Retrieve house information from the database based on the id
    // Query inner joins tables with houses-table and searches where houses.id is the same as in the parameter.
    const query = {
      text: "SELECT * FROM saved_buildings WHERE user_id = $1",
      values: [id],
    };
    const { rows } = await pool.query(query);
    const savedBuildings = rows;

    // Check if a house with the provided id exists
    if (!savedBuildings) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send the house data as a JSON response
    res.json(savedBuildings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/mymessages/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Retrieve house information from the database based on the id
    // Query inner joins tables with houses-table and searches where houses.id is the same as in the parameter.
    const query = {
      text: "SELECT * FROM messages INNER JOIN users ON messages.sender_id = users.id WHERE sender_id = $1 OR receiver_id = $1",
      values: [id],
    };
    const { rows } = await pool.query(query);
    const savedBuildings = rows;

    // Check if a house with the provided id exists
    if (!savedBuildings) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send the house data as a JSON response
    res.json(savedBuildings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


  // app.get("/", async (req, res) => {
  //   console.log('houses')
  //   const query = "SELECT * FROM houses";
  //   const { rows } = await pool.query(query);
  //   res.json(rows);
  //   console.log(rows)
  // });
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