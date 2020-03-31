const API = {
  //---Return the last workout added 
  async getLastWorkout() {
    let res;
    try {
      console.log("Getting the last workout!!!!");
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log(err)
    }
    console.log(res);
    const json = await res.json();

    return json[json.length - 1];
  },
  //-----Add a new exercise
  async addExercise(data) {
    console.log("Adding an exercise, updating a workout!!!!")
    const id = location.search.split("=")[1];
    console.log("This is the location.search result", location.search)
    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },

  //------Create a new workout session  
  async createWorkout(data = {}) {
    console.log("Creating a new workout!!!")
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    return json;
  },

  //------Get the workouts within a specific range
  async getWorkoutsInRange() {
    console.log("Getting the workout range!!!")
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};
