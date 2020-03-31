let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const WorkoutSchema = new Schema({ 
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{   
        type: {
            type: String,
            required: 'Workout type is required.'
        },
        name: {
            type: String,
            required: 'Name of exercise is required.'
        },
        duration: {
            type: Number,
            required: 'Duration is required.'
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        },
        distance: {
            type: Number
        }
    }]
})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;