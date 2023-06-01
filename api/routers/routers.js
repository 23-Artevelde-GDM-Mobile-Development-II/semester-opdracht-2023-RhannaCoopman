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
    const query = "SELECT * FROM houses ORDER BY online_since DESC";
    const { rows } = await pool.query(query);

    res.json(rows);



  });

  app.get("/house/:id", async (req, res) => {
    const id = req.params.id;

    try {
      // Retrieve house information from the database based on the id
      // Query inner joins tables with houses-table and searches where houses.id is the same as in the parameter.
      const query = {
        text: "SELECT houses.*, energylabel.name as energylabel, house_type.name as housetype, city.name as cityname, city.citycode as citycode, building_type.name as buildingtype, windowtypes.name as windowtype, state.name as state, status.name as status FROM houses INNER JOIN energylabel ON houses.energylabel_id = energylabel.id INNER JOIN house_type ON houses.house_type_id = house_type.id INNER JOIN city ON houses.city_id = city.id INNER JOIN building_type ON houses.buildings_id = building_type.id INNER JOIN windowtypes ON houses.windowtype_id = windowtypes.id INNER JOIN state ON houses.state_id = state.id INNER JOIN status ON houses.status_id = status.id WHERE houses.id = $1",
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
      const data = req.body;
  
      // Insert the conversation into the conversations table
      const conversationQuery = {
        text: "INSERT INTO conversations (building_id, participant_one, participant_two) VALUES ($1, $2, $3) RETURNING id",
        values: [data.house_id, data.sender_id, data.receiver_id],
      };
      const { rows: conversationRows } = await pool.query(conversationQuery);
  
      if (conversationRows.length === 0) {
        throw new Error("Failed to create conversation");
      }
  
      const conversationId = conversationRows[0].id;
  
      // Insert the message into the messages table
      const messageQuery = {
        text: "INSERT INTO messages (sender_id, building_id, content, receiver_id, send_time, conversation_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        values: [
          data.sender_id,
          data.house_id,
          data.message,
          data.receiver_id,
          data.timestamp,
          conversationId,
        ],
      };
      const { rows: messageRows } = await pool.query(messageQuery);
  
      res.json({ messages: messageRows });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  });

  app.post("/sendmessage", async (req, res) => {

    const data = req.body;

    console.log(data);

    try {

      // Insert the message into the database
      const messageQuery = {
        text: "INSERT INTO messages (sender_id, building_id, content, receiver_id, send_time, conversation_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        values: [
          data.sender_id,
          data.house_id,
          data.message,
          data.receiver_id,
          data.sendtime,
          data.conversation_id,
        ],
      };
      const rows = await pool.query(messageQuery);

      res.json( rows );

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

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
      text: "SELECT * FROM saved_buildings INNER JOIN houses ON saved_buildings.building_id = houses.id  WHERE user_id = $1",
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
      text: "SELECT conversations.*, users.username, users.agency_id, realestate_agency.name as realestate_name, houses.name as house_name FROM conversations INNER JOIN users ON conversations.participant_two = users.id LEFT OUTER JOIN realestate_agency ON users.agency_id = realestate_agency.id INNER JOIN houses ON conversations.building_id = houses.id where participant_one = $1 OR participant_two = $1",
      values: [id],
    };
    const { rows } = await pool.query(query);
    const messages = rows;


    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getmessages/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Retrieve house information from the database based on the id
    // Query inner joins tables with houses-table and searches where houses.id is the same as in the parameter.
    const query = {
      text: "SELECT * FROM messages WHERE sender_id = $1 OR receiver_id = $1 ORDER BY conversation_id, send_time ASC",
      values: [id],
    };
    const { rows } = await pool.query(query);
    const messages = rows;

    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch("/updateUserData/:id", async (req, res) => {
  const id = req.params.id;

  const data = req.body;

  let values = [id];
  let queryValues = [];
  let index = 2;

  for (const key in data) {
    if (data[key].length !== 0) {

      queryValues.push(key + ' = $' + index);
      values.push(data[key]);

      index++;
    }
  }

  const updateQuery = {
    text: `UPDATE users SET ${queryValues} WHERE id = $1 RETURNING *`,
    values: values
  };

  const rows = await pool.query(updateQuery);
  res.json( rows );

});

app.post("/makelaar/createhouse", async (req, res) => {
  try {

    const data = req.body;

    console.log(data)

    // Insert the message into the database
    const houseQuery = {
      text: "INSERT INTO houses (name, description, images, house_type_id, housenumber, streetname, city_id, status_id, bedrooms, bathrooms, toilets, attic, basement, garage, swimmingpool, parkingspots, habitable_surface, garden_surface, lot_surface, construction_year, buildings_id, cadastral_income, solar_panels, windowtype_id, elevator, available, online_since, state_id, latest_renovation, facades,  price, energylabel_id, realestate_agency_id, realestate_agent_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34) RETURNING *",
      values: [
        data.name,
        data.description,
        data.image,
        data.house_type_id,
        data.housenumber,
        data.streetname,
        data.city_id,
        data.status_id,
        data.bedrooms, 
        data.bathrooms,
        data.toilets,
        data.attic,
        data.basement,
        data.garage,
        data.swimmingspool,
        data.parkingspots,
        data.habitable_surface,
        data.garden_surface,
        data.lot_surface,
        data.construction_year,
        data.buildings_id,
        data.cadastral_income,
        data.solar_panels,
        data.windowtype_id,
        data.elevator,
        data.available,
        data.online_since,
        data.state_id,
        data.latest_renovation,
        data.facades, 
        data.price,
        data.energylabel_id,
        data.realestate_agency_id,
        data.realestate_agent_id
      ],
    };

    const rows = await pool.query(houseQuery);

    res.json( rows );

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch("/makelaar/updatehouse/:id", async (req, res) => {
  const id = req.params.id;

  const data = req.body;

  console.log(data);

  let values = [id];
  let queryValues = [];
  let index = 2;

  for (const key in data) {
    if (data[key] !== null && data[key].length !== 0) {

      queryValues.push(key + ' = $' + index);
      values.push(data[key]);

      index++;
    }
  }

  const updateQuery = {
    text: `UPDATE houses SET ${queryValues} WHERE id = $1 RETURNING *`,
    values: values
  };

  const rows = await pool.query(updateQuery);
  res.json( rows );

});

app.get("/makelaar/gethouseoptions", async (req, res) => {
  try {
    
    const houseTypeQuery = await pool.query("SELECT * FROM house_type");
    const cityQuery = await pool.query("SELECT * FROM city");
    const statusQuery = await pool.query("SELECT * FROM status");
    const buildingTypeQuery = await pool.query("SELECT * FROM building_type");
    const windowTypesQuery = await pool.query("SELECT * FROM windowtypes");
    const stateQuery = await pool.query("SELECT * FROM state");
    const energyLabelQuery = await pool.query("SELECT * FROM energylabel");

    const houseOptions = {
      house_type: houseTypeQuery.rows,
      city: cityQuery.rows,
      status: statusQuery.rows,
      building_type: buildingTypeQuery.rows,
      windowtypes: windowTypesQuery.rows,
      state: stateQuery.rows,
      energylabel: energyLabelQuery.rows,
    };

    res.json(houseOptions);

  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
})

app.delete('/makelaar/deletehouse/:id', async (req, res) => {
  try {
      const id = req.params.id
      const { rows }  = await pool.query('DELETE FROM houses WHERE id = $1 RETURNING *', [id])
      res.json(rows)
  } catch (err) {
      console.log(err.message)
      res.status(500).send('Server error')
  }
})

app.post("/savebuilding", async (req, res) => {

  const data = req.body;

  console.log(data);

  try {

    // Insert the message into the database
    const saveQuery = {
      text: "INSERT INTO saved_buildings (user_id, building_id) VALUES ($1, $2) RETURNING *",
      values: [
        data.user_id,
        data.building_id,
      ],
    };
    const rows = await pool.query(saveQuery);

    res.json( rows );

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete('/deletebuilding', async (req, res) => {
  const data = req.body;

  console.log(data)

  try {
      const { rows }  = await pool.query('DELETE FROM saved_buildings WHERE user_id = $1 AND building_id = $2 RETURNING *', [data.id, data.building_id])
      res.json(rows)
  } catch (err) {
      console.log(err.message)
      res.status(500).send('Server error')
  }
})

app.get("/admin/getusers", async (req, res) => {
  try {
    
    const {rows} = await pool.query("SELECT * FROM users");

    res.json(rows);

  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
})

app.get("/admin/gethouses", async (req, res) => {
  try {
    
    const {rows} = await pool.query("SELECT * FROM houses");

    res.json(rows);

  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
})

app.get("/admin/getagencies", async (req, res) => {
  try {
    
    const {rows} = await pool.query("SELECT * FROM realestate_agency");

    res.json(rows);

  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
})

app.get("/admin/getdatabase", async (req, res) => {
  try {
    
    const houseTypeQuery = await pool.query("SELECT * FROM house_type");
    const cityQuery = await pool.query("SELECT * FROM city");
    const statusQuery = await pool.query("SELECT * FROM status");
    const buildingTypeQuery = await pool.query("SELECT * FROM building_type");
    const windowTypesQuery = await pool.query("SELECT * FROM windowtypes");
    const stateQuery = await pool.query("SELECT * FROM state");
    const energyLabelQuery = await pool.query("SELECT * FROM energylabel");
    const userLevelsQuery = await pool.query("SELECT * FROM user_levels");


    const database = {
      house_type: houseTypeQuery.rows,
      city: cityQuery.rows,
      status: statusQuery.rows,
      building_type: buildingTypeQuery.rows,
      windowtypes: windowTypesQuery.rows,
      state: stateQuery.rows,
      energylabel: energyLabelQuery.rows,
      user_levels: userLevelsQuery.rows,
    };

    res.json(database);

  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
})

app.get("/admin/getuser/:id", async (req, res) => {
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

app.patch("/admin/updateuser/:id", async (req, res) => {
  const id = req.params.id;

  const data = req.body;

  let values = [id];
  let queryValues = [];
  let index = 2;

  for (const key in data) {
    if (data[key].length !== 0) {

      queryValues.push(key + ' = $' + index);
      values.push(data[key]);

      index++;
    }
  }

  const updateQuery = {
    text: `UPDATE users SET ${queryValues} WHERE id = $1 RETURNING *`,
    values: values
  };

  const rows = await pool.query(updateQuery);
  res.json( rows );

});

app.delete('/admin/deleteuser/:id', async (req, res) => {

  const id = req.params.id;

  try {
      const { rows }  = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id])
      res.json(rows)
  } catch (err) {
      console.log(err.message)
      res.status(500).send('Server error')
  }
})

app.get("/admin/getbuilding/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Retrieve house information from the database based on the id
    // Query inner joins tables with houses-table and searches where houses.id is the same as in the parameter.
    const query = {
      text: "SELECT * FROM houses WHERE id = $1",
      values: [id],
    };
    const { rows } = await pool.query(query);
    const house = rows[0];

    // Check if a house with the provided id exists
    if (!house) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send the house data as a JSON response
    res.json(house);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch("/admin/updatebuilding/:id", async (req, res) => {
  const id = req.params.id;

  const data = req.body;

  let values = [id];
  let queryValues = [];
  let index = 2;

  for (const key in data) {
    if (data[key].length !== 0) {

      queryValues.push(key + ' = $' + index);
      values.push(data[key]);

      index++;
    }
  }

  const updateQuery = {
    text: `UPDATE houses SET ${queryValues} WHERE id = $1 RETURNING *`,
    values: values
  };

  const rows = await pool.query(updateQuery);
  res.json( rows );

});

app.delete('/admin/deletebuilding/:id', async (req, res) => {

  const id = req.params.id;

  try {
      const { rows }  = await pool.query('DELETE FROM houses WHERE id = $1 RETURNING *', [id])
      res.json(rows)
  } catch (err) {
      console.log(err.message)
      res.status(500).send('Server error')
  }
})



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