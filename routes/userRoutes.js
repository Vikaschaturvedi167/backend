const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');

// Routes for user operations
router.get('/users', userController.getUsers);            // Get all users
router.post('/users', userController.addUser);            // Add a new user
router.delete('/users/:id', userController.deleteUser);   // Delete user (soft delete)
router.post('/users/export', userController.exportUsers); // Export selected users as CSV

module.exports = router;
