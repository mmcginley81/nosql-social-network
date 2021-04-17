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
    .then(({ _id, username }) => {
    return User.findOneAndUpdate(
        { username: username }, { $push: { thoughts: _id } }, { new: true })
    })
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

/* Update a thought
router.put('/:_id', ({ params, body }, res) => {
    User.findOneAndUpdate({ _id: params._id}, body, { new: true })
    .then(dbThoughtData => {
      if(!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id! '});
          return;
    }
    res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  });

*/

// Update a thought
router.put('/:_id', (req, res) => {
    Thoughts.findOneAndUpdate(
        { _id: req.params._id }, req.body, { new: true })
    .then(dbThoughtData => {
        if(!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id! '});
            return;
      }
      res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
    });

// Delete a thought
router.delete('/:_id', ({ params, body }, res) => {
    Thoughts.findOneAndDelete({ _id: params._id })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No user found with this id! '});
                return;
          }
          res.json(dbThoughtData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
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
      {
        new: true
      }
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
router.delete('/:_id/reactions/:reactionId', (req, res) => {
    Thoughts.findOneAndUpdate(
      {
        _id: req.params._id
    },
    {
      $pull: {
        reactions: {
            reactionId: req.params.reactionId
        }
      }
    },
    {
        new: true
    }
    )
    .then(dbThoughtsData => {
        res.json(dbThoughtsData)
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  });




module.exports = router