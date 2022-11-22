const express = require("express")
const cors = require("cors");
const app = express();

app.use(express.json());
var corsOptions = {
    origin: "http://localhost:8081",
  };
 app.use(cors(corsOptions));
 app.use(express.urlencoded({ extended: true }));

 const db = require("./app/models");
 const Role = db.role;
 var dbConfig = require("./app/config/db.config")
 db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "patient",
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'user' to roles collection");
        });
        new Role({
          name: "shop",
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'shop' to roles collection");
        });
        new Role({
          name: "admin",
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }

require("./app/routes/auth.routes")(app)
require("./app/routes/product.routes")(app)
 app.get("/", (req, res) => {
    res.json({ message: "Welcome to Thulane Tutorial application." });
  }); 
  const PORT = process.env.PORT || 8081;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
  