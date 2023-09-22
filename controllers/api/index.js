const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const templateRoutes = require('./templateRoutes.js');
const workoutRoutes = require('./workoutRoutes.js');
const entryRoutes = require('./entryRoutes.js');

router.use('/users', userRoutes);
router.use('/templates', templateRoutes);
router.use('/workouts', workoutRoutes);
router.use('/entries', entryRoutes);

module.exports = router;
