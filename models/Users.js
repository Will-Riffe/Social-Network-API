const { Schema, model } = require('mongoose');


/* 
    schema for our Users
*/
const users = new Schema(
  {
    // username preperties
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 17,
    },
    // users email
    email: {
      type: String,
      required: true,
      unique: true,
      // regex for checking the most common email types
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    // models the id reference to a users 'thoughts'
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    // array of ObjectId references to the user's friends (self-reference)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    // include virtual properties in JSON output
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false, // disabled because we use reactionId...
  }
);

    // includes virtual properties to get length of the 'friends' property
    userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Create the User model and export it
const User = model('User', users);

module.exports = User;
