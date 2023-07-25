// imports
const { User, Thought } = require('../models');

// logic to handle various 'user-related' operations
const userController = {


  // get all users
  getAllUsers(req, res) {
    User.find({})
      .populate('thoughts', '-__v') // populate thoughts field, excluding __v
      .populate('friends', '-__v') // populate friends field, excluding __v
      .select('-__v') // exclude __v from the main document
      .then((users) => res.json(users)) // send the response with the users data in JSON format
      .catch((err) => {
        console.log(err);
        res.sendStatus(500).json({ message: 'Error... check userController.js 17'}); // send a 500 status code for internal server error
      });
  },


  // pull user by is
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts', '-__v')
      .populate('friends', '-__v')
      .then((user) => {
        if (!user) {
          // user is not found, 404 status and a message
          return res.status(404).json({ message: 'No user found with this ID... check userController.js 31' });
        }
        res.json(user); // send response with user data in JSON format
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500).json({ message: 'error in getSingleUser controller, userController.js line 37'});
      });
  },


  // make new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user)) // Send response w/ newly created user data in JSON format
      .catch((err) => {
        console.log(err);
        res.sendStatus(500).json({ message: 'error in creating new user, userController.js Line 48'});
      });
  },


  // update existing user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body, // Update the user with the data from the request body
      { runValidators: true, new: true } // Run validators on the update, and return the updated document
    )
      .then((user) => {
        if (!user) {
          // If the user is not found, respond with a 404 status and a message
          return res.status(404).json({ message: 'No user found with this ID... userController 63' });
        }
        res.json(user); // Send the response with the updated user data in JSON format
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500).json({ message: 'error updating user... userController line 69'});
      });
  },

  // delete user, all associated thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          // user is not found, 404 status and a message
          return res.status(404).json({ message: 'No user found with this ID... userController 79' });
        }
        // delete associated thoughts
        return Thought.deleteMany({ _id: { $in: user.thoughts } });
      })
      .then(() => {
        res.json({ message: 'User and associated thoughts deleted successfully' }); 
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500).json({ message: 'error deleting user presence... userController 89'}); 
      });
  },

  // add friend to friends list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } }, // adds the friendId using $push
      { runValidators: true, new: true } // run validators on update, return the updated document
    )
      .then((user) => {
        if (!user) {
          // user is not found, 404 status and a message
          return res.status(404).json({ message: 'No user found with this ID... userController 103' });
        }
        res.json(user); // send response with updated user data in JSON format
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500).json({ message: 'error adding friend... userController 109'});
      });
  },

  // remove friend from user's friends list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } }, // remove the friendId from the friends array using $pull
      { runValidators: true, new: true } // run validators on the update, and return the updated document
    )
      .then((user) => {
        if (!user) {
          // user is not found, 404 status and a message
          return res.status(404).json({ message: 'No user found with this ID... userController 123' });
        }
        res.json(user); // Send the response with the updated user data in JSON format
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500).json({ message: 'error removing friend... userController 129' });
      });
  },
};

// Export the userController object to be used in other files
module.exports = userController;
