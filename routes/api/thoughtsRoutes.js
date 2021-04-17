const router = require("express").Router();
const { Thoughts, User } = require('../../models');

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
// Thoughts isn't necessarily a subdocument, but it kind of is since a thought can only come from a user
app.post('/', ({ body }, res) => {
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



module.exports = router