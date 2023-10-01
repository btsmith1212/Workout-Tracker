const router = require('express').Router();
const { Entries, Workouts, User, Template } = require('../models');
const withAuth = require('../utils/auth');

// Get all templates for homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const templateData = await Template.findAll({
      include: [
        {
          model: User,
          attributes: ['id'],
        },
      ],
      where: {
        user_id: req.session.user_id,
      },
    });
    const templates = templateData.map(template =>
      template.get({ plain: true })
    );
    console.log(templates);
    res.render('homepage', {
      templates,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all templates for homepage
router.get('/template', withAuth, async (req, res) => {
  try {
    const workoutData = await Workouts.findAll({});
    const workouts = workoutData.map(workouts => workouts.get({ plain: true }));
    const armWorkouts = workouts.filter(
      workouts => workouts.category === 'Arms'
    );
    const backWorkouts = workouts.filter(
      workouts => workouts.category === 'Back'
    );
    const chestWorkouts = workouts.filter(
      workouts => workouts.category === 'Chest'
    );
    const coreWorkouts = workouts.filter(
      workouts => workouts.category === 'Core and Abs'
    );
    const dynamicWorkouts = workouts.filter(
      workouts => workouts.category === 'Dynamic Lifts'
    );
    const legWorkouts = workouts.filter(
      workouts => workouts.category === 'Legs'
    );
    const shoulderWorkouts = workouts.filter(
      workouts => workouts.category === 'Shoulders'
    );

    res.render('template', {
      armWorkouts,
      backWorkouts,
      chestWorkouts,
      coreWorkouts,
      dynamicWorkouts,
      legWorkouts,
      shoulderWorkouts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/entry/:id', withAuth, async (req, res) => {
  try {
    const entryWorkouts = await Workouts.findAll({
      where: {
        template_id: req.params.id,
      },
    });

    const workouts = entryWorkouts.map(workouts =>
      workouts.get({ plain: true })
    );

    console.log(workouts);

    res.render('entry', {
      workouts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Get login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
