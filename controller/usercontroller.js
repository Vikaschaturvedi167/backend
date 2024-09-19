const User = require('../model/user');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ deleted: false });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Add a new user
exports.addUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Simple validation can be done using express-validator
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  try {
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add user' });
  }
};

// Delete a user (soft delete)
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndUpdate(id, { deleted: true });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// Export users as CSV
exports.exportUsers = async (req, res) => {
  try {
    const selectedUserIds = req.body.userIds;
    const users = await User.find({ _id: { $in: selectedUserIds }, deleted: false });
    
    let csv = 'id,email,first_name,last_name\n';
    users.forEach(user => {
      csv += `${user._id},${user.email},${user.firstName},${user.lastName}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
    res.status(200).send(csv);
  } catch (err) {
    res.status(500).json({ error: 'Failed to export users' });
  }
};
