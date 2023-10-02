const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const templateRoutes = require('./templateRoutes.js');

router.use('/users', userRoutes);
router.use('/templates', templateRoutes);

module.exports = router;
