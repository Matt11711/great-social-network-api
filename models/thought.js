// import necessary functions and objects
const { Schema, model, Types } = require("mongoose");
const opts = { toJSON: { virtuals: true, getters: true } };
const dateFormat = require("../utils/dateFormat");

// Sets up the reaction schema
const reactionSchema = new Schema(
  {
//    the id is going to be an object id data type
    reactionId: {
  
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    // body is going to be a string with max length of 280 characters
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    //username will be a string
    username: {
      type: String,
      required: true,
        },
    // uses a getter function to format the date, and it gives the time that the reaction was created at.
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  opts
);

// Sets up the thought schema
const ThoughtSchema = new Schema(
  {
    // required field that is a string between 1 and 280 characters long
    thoughtText: {
      type: String,
      required: "Please input thought text!",

   
      minlength: 1,
      maxlength: 280,
    },
// same as above createdAt field
        createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
//  required string data type
        username: {
      type: String,
      required: "Please provide a username!",
        },
        // this pulls the reactions as a sub document.
    reactions: [reactionSchema],
  },
  opts
);

// this is the required virtual to get the length of the reactions array.
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const thought = model("Thought", ThoughtSchema);

module.exports = thought;
