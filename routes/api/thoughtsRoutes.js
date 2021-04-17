const router = require("express").Router();
const { Thoughts, User } = require('../../models');


// Get all Thoughts
router.get('/', (req, res) => {
    Thoughts.find({})
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No thoughts found with this id! '});
            return;
      }
      res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  });

// Create a new thought for a user
router.post('/', ({ body }, res) => {
    Thoughts.create(body)
    .then(({ _id }) => 
    User.findOneAndUpdate(
        {}, { $push: { thoughts: _id } }, { new: true })
    )
    .then(dbThoughtsData => {
        res.json(dbThoughtsData)
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  });
  
// Get a thought by Id
router.get('/:_id', (req, res) => {
    Thoughts.findOne(
        { _id: req.params._id }
    )
    .then(dbThoughtsData => {
        res.json(dbThoughtsData)
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  });

// Post a reaction
  router.post('/:_id/reactions', (req, res) => {
    Thoughts.findOneAndUpdate(
      {
        _id: req.params._id,
      },
      {
        $addToSet: {
          reactions: req.body
        }
      },
    )
    .then(dbThoughtsData => {
        res.json(dbThoughtsData)
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  });

// Delete a reaction


module.exports = router