// Express is a standard server and API building framework for Node.js
const express = require("express");
// Mongoose is used to interact with a mongoDB database. Mongoose allows easier reference to mongoDB data because it models out the db within your project code.
const mongoose = require("mongoose");
// Morgan is a middleware that allows us to easily log requests, errors, and more to the console.
const logger = require("morgan");
// The Path module provides a way of working with directories and file paths.
const path = require("path");

// Require the workoutModel Schema for API routes
const Workout = require("./models/workoutModel");

// Set port to process.env.PORT or 3000 if nothing is on process.env.PORT
const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

// You need .json and .urlencoded middleware for POST and PUT requests, because in both these requests you are sending data.
// Returns middleware that parses urlencoded
// express.urlencoded() is a method built into express to recognize the incoming Request Object as strings or arrays.
app.use(express.urlencoded({ extended: true }));
// Returns middleware that parses json
app.use(express.json());
app.use(express.static("public"));

// Set up the mongoose connection the mongoDB database.
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";
mongoose.connect(MONGODB_URI);

//============Routes=========================
//Route to the main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
// Route to the exercises form
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});
// Route to the stats page
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

//------Create a new workout-----------------
app.post("/api/workouts", (req, res) => {
  console.log("Creating a new workout", req.body);
  Workout.create(req.body, (error, saved) => {
    if (error) {
      console.log(error);
    } else {
      res.send(saved);
    }
  });
});
//--------Get the last workouts------------------
app.get("/api/workouts", (req, res) => {
  Workout.find({}, (error, found) => {
    if (error) {
      console.log(error);
    } else {
      res.json(found);
    }
  });
});
//---------Add a new exercise-------------
app.put("/api/workouts/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  console.log("put route");
  Workout.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { exercises: req.body } },
    (error, workoutById) => {
      if (error) {
        console.log(error);
      } else {
        console.log(workoutById);
        res.json(workoutById);
      }
    }
  );
});
//---------Get workout range------------------
app.get("/api/workouts/range", (req, res) => {
  Workout.find({}, (error, range) => {
    if (error) {
      console.log(error);
    } else {
      res.json(range);
    }
  });
});

//=============================================

app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}/`);
});
