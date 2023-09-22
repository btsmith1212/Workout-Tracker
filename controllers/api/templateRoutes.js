const router = require('express').Router();
const { Template } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE NEW TEMPLATE
router.post('/', withAuth, async (req, res) => {
  try {
    const newTemplate = await Template.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newTemplate);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE TEMPLATE

router.put('/:id', withAuth, async (req, res) => {
  try {
    const templateData = await Template.update({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    res.status(200).json(templateData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE TEMPLATE
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const templateData = await Template.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!templateData) {
      res.status(404).json({ message: 'No template found with this id!' });
      return;
    }

    res.status(200).json(templateData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
