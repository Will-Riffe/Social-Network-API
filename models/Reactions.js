// destructure/declare required modules
const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateUtil');


/* 
    schema for our reactions
*/
const Reactions = new Schema(
  {
    // assigns unique id to reactions
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    // contains the message of the reaction (i.e. 'the body')
    reactionBody: {
      type: String,
      required: true,
      maxlength: 250
    },
    // contains name of the reactions user/owner
    username: {
      type: String,
      required: true
    },
    // formats the timestamp from our date-fns based util
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp, 'yyyy-MM-dd HH:mm:ss')
    }
  },
  {
    // Includes virtual properties in JSON output
    toJSON: {
      getters: true
    },
    id: false // isabled because we use reactionId...
  }
);

module.exports = Reactions;
