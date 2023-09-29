const router = require('express').Router();
const { Entries, Workouts, User, Template } = require('../models');
const withAuth = require('../utils/auth');

// Get all templates for homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const templateData = await Template.findAll({
      include: [
        {
          model: Workouts,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const templates = templateData.map(template =>
      template.get({ plain: true })
    );

    console.log(templates);
    // Pass serialized data and session flag into templates
    res.render('homepage', {
      templates,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/entry', withAuth, async (req, res) => {
  try {
    const entriesData = await Entries.findAll({
      include: [
        {
          model: Workouts,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const entries = entriesData.map(entries => entries.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('entry', {
      entries,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get signup page
router.get('/signup', (req, res) => {
  // if (req.session.logged_in) {
  //   res.redirect('/profile');
  //   return;
  // }

  res.render('signup');
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

// Get Template Information
router.get('/template/:id', async (req, res) => {
  try {
    const templateData = await Template.findByPk(req.params.id, {
      include: [
        {
          model: Workouts,
          attributes: ['name'],
        },
      ],
    });

    const template = templateData.get({ plain: true });

    res.render('template', {
      ...template,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get single entry information
router.get('/entries/:id', async (req, res) => {
  try {
    const entriesData = await Entries.findByPk(req.params.id, {
      include: [
        {
          model: Workouts,
          attributes: ['name'],
        },
      ],
    });

    const entries = entriesData.get({ plain: true });

    res.render('entry', {
      ...entries,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
