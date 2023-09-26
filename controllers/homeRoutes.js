const router = require('express').Router();
const { Entries, Workouts, User, Template } = require('../models');
const withAuth = require('../utils/auth');

// Get all templates for homepage
router.get('/', async (req, res) => {
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
    const template = templateData.map(template =>
      template.get({ plain: true })
    );

    // Pass serialized data and session flag into template
    res.render('homepage', {
      template,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/entry', async (req, res) => {
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
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
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

// Login to profile if authenticated
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Template }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
