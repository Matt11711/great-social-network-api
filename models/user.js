// import required objects and functions from mongoose
const { Schema, model } = require("mongoose");

const opts = { toJSON: { virtuals: true, getters: true } };

// Sets up the user schema
const UserSchema = new Schema(
  {
    // username is a string that must be unique, is required, and is trimmed

    username: {
      type: String,
      unique: true,
      trim: true,
      required: "Please input a username!",
    },
    // email must be a unique string, is also required, and must be a valid email.
    email: {
      type: String,
      required: "Please input a valid email address!",
      unique: true,
      match: [/.+\@.+\..+/, "Please input a valid email address!"],
    },
    thoughts: [
      {
        // references the thought schema/document
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],

    friends: [
      {
        // references its own schema/document
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  opts
);

// virtual that gets how many friends a user has
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});
const user = model("user", UserSchema);

module.exports = user;
