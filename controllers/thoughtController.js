// import models
const { Thought, User } = require('../models');

// logic to handle various 'thought-related' operations
const thoughtController = {


  // pull all thoughts
  getAllThoughts(req, res) { // methodDefinition(express parameters)
    Thought.find() // Mongoose model 'Thought' query
      .populate({ // method to populate reaction fields
        path: 'reactions',
        select: '-__v', // excludes the version field from populated reactions
      })
      .select('-__v')
      .then((thoughts) => res.json(thoughts)) //promise to handle results of 'Thought.find()'
      .catch((err) => res.status(500).json({ message: 'Error... Check thoughtController.js 17'}));
  },


  // pull thought by ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId }) // Mongoose 'findOne' method, matches id through 'thoughtId' parameter of request.
      .select('-__v')
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'No thought found containing this ID. Check thoughtController.js 31' });
        } else {
          res.json(thought);
        }
      })
      .catch((err) => res.status(500).json(err));
  },


  // make new thought
  createThought(req, res) {
    // Log the request body (optional)
    console.log(req.body, "trying to make a new thought...");


    // using the request body data...
    Thought.create(req.body)
      .then((thought) => {
        // find user, update their thoughts array w/ new thought ID
        User.findByIdAndUpdate(
          req.body.userId,
          { $addToSet: { thoughts: thought._id } }, // $addToSet avoids dupes
          { new: true }
        )
          .then((user) => {
            if (!user) {
              // no user found, respond w/ error
              res.status(404).json({
                message: 'User not found... thought made. Check thoughtController.js',
              });
            } else {
              // user found, respond with the newly created thought
              res.json(thought);
            }
          })
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  },


  // update existing thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body }, // $set to update specific fields
      { runValidators: true, new: true } // runValidators validates updated data, new to return the updated thought
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'No thought found containing this ID. Check thoughtController.js 80' });
        } else {
          res.json(thought);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


  // delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'No thought found containing this ID Check thoughtController.js 96' });
          return;
        }

        // find user, remove the thought ID from their thoughts array
        User.findByIdAndUpdate(
          req.body.userId,
          { $pull: { thoughts: thought._id } },
          { new: true }
        )
          .then((user) => {
            if (!user) {
              res.status(404).json({
                message: 'User not found... but thought deleted. Check  Check thoughtController.js 109',
              });
            } else {
              res.json(user);
            }
          })
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  },


  // add reaction to thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } }, // $addToSet to avoid reactions dupes
      { new: true }
    )
      .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'No thought with this id!  Check thoughtController.js 131' });
        } else {
          res.json(thought);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  
  // delete reaction from a thought
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } }, // $pull to remove the specific reaction by its ID
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'No thought found with this id.  Check thoughtController.js 151' });
        } else {
          res.json(thought.reactions);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

// Export the thoughtController object to be used in the 'thoughtRoutes.js' file
module.exports = thoughtController;
