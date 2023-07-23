// destructure/declare required modules
const { Schema, model } = require('mongoose');
const reactionModel = require('./Reactions');
const dateFormat = require('../utils/dateUtil');


/* 
    schema for our reactions
*/
const thoughts = new Schema(
  {
    // The text of the thought
    thoughtText: {
      type: String,
      required: true,
      maxLength: 1000
    },
    // The timestamp of when the thought was created
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp, 'yyyy-MM-dd HH:mm:ss')
    },
    // The username of the user who created the thought
    username: {
      type: String,
      required: true
    },
    // incorporates our reaction model schema into the Thoughts model
    reactions: [reactionModel]
  },
  {
    // Includes virtual properties in JSON output
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false // isabled because we use reactionId...
  }
);

// Virtual property 'reactionCount' to retrieve the length of the reactions array field
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Create the Thought model and export it
const Thoughts = model('Thoughts', thoughts);

module.exports = Thoughts;
