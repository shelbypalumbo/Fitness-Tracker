const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const Workout = require("./models/workoutModel");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout"
mongoose.connect(MONGODB_URI);


//============Routes=========================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});
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
  console.log(req.body)
  console.log(req.params.id)
  console.log("put route")
  Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { "exercises": req.body } }, (error, workoutById) => {
    if (error) {
      console.log(error);
    } else {
      console.log(workoutById)
      res.json(workoutById);
    }
  });
})
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