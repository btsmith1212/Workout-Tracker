const router = require('express').Router();
const { Workouts } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newWorkouts = await Workouts.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newWorkouts);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const workoutsData = await Workouts.update({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    res.status(200).json(workoutsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const workoutsData = await Workouts.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!workoutsData) {
      res.status(404).json({ message: 'No workouts found with this id!' });
      return;
    }

    res.status(200).json(workoutsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
