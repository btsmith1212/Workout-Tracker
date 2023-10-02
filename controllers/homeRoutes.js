const router = require('express').Router();
const { User, Template } = require('../models');
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

// Render template page when creating a new template
router.get('/template', withAuth, async (req, res) => {
  try {
    res.render('template', {
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
