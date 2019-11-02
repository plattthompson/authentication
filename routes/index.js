const router = require('express').Router();
const authRoutes = require('./auth');
const htmlRoutes = require('./html');

router.use('/', authRoutes);
router.use('/', htmlRoutes);

module.exports = router;
