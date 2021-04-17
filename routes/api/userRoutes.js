const router = require("express").Router();
const { User, Thoughts } = require('../../models')

//Get all users
router.get('/', (req, res) => {
    User.find({})
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id! '});
            return;
      }
      res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  });

//Create a user
router.post('/', ({ body }, res) => {
  User.create(body)
  .then(dbUserData => {
    if(!dbUserData) {
        res.status(404).json({ message: 'No user found with this id! '});
        return;
  }
  res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

//Get users by _id POPULATE THOUGHT AND FRIEND DATA
router.get('/:_id', (req, res) => {
    User.findOne(
        { _id: req.params._id }
    )
    .select('-__v')
    .populate(
        'thoughts'
      //path: 'thoughts',
      //select: '-__v'
    )
    .populate(
      'friends'
    ) 
      .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id! '});
            return;
      }
      res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  });

//Update a user by id
router.put('/:_id', ({ params, body }, res) => {
    User.findOneAndUpdate({ _id: params._id }, body, { new: true })
    .then(dbUserData => {
      if(!dbUserData) {
          res.status(404).json({ message: 'No user found with this id! '});
          return;
    }
    res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  });

// Delete a user
router.delete('/:_id', ({ params }, res) => {
    User.findOneAndDelete({ _id: params._id })
    .then(({ thoughts, username }) => {
      return Thoughts.deleteMany(
          { username: username }, { new: true })
      })
    .then(dbUserData => {
      if(!dbUserData) {
          res.status(404).json({ message: 'No user found with this id! '});
          return;
    }
    res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  });

//add a new friend to a user's friend list
router.post('/:_id/friends/:friendId', (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params._id },
    { $addToSet: {
      friends: req.params.friendId
      }
    }
  )
  .then(dbUserData => {
    if(!dbUserData) {
        res.status(404).json({ message: 'No user found with this id! '});
        return;
  }
  res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

// Delete a friend from the friend list
router.delete('/:_id/friends/:friendId', (req, res) => {
  User.findOneAndUpdate(
    {
      _id: req.params._id
  },
  {
    $pull: {
      friends: req.params.friendId
      
    }
  }
  )
    .then(dbUserData => {
      res.json(dbUserData);
    })
    .catch(err => {
      res.json(err);
    });
});


module.exports = router


