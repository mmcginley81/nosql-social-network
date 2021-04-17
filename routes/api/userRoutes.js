const router = require("express").Router();
const { User } = require('../../models')

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
        { _id: params.id }
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
    User.findOneAndUpdate({ _id: params.id}, body, { new: true })
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

router.delete('/:_id', ({ params }, res) => {
    Pizza.findOneAndDelete({ _id: params.id })
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
    {_id: req.params.friendId},
    { $addToSet: {
      friends: req.body
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

// Delete a note from a notebook
router.delete('/:_id/friends/:friendId', (req, res) => {
  Notebook.findOneAndUpdate(
    {
      _id: req.params
  },
  {
    $pull: {
      friends: {
        friendId: req.params.friendId
      }
    }
  }
  )
    .then(dbNotebookData => {
      res.json(dbNotebookData);
    })
    .catch(err => {
      res.json(err);
    });
});


module.exports = router


