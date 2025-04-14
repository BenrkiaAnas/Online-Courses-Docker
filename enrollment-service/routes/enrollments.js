const express = require('express');
const router = express.Router();
const { enroll, getUserEnrollments } = require('../controllers/enrollmentController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken, getUserEnrollments);

router.post('/', verifyToken, enroll);

module.exports = router;
