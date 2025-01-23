// models/todo.js
const db = require('../config/database');

exports.validatedUser = function(username, callback) {
    db.query('SELECT * FROM user_profile WHERE username = ? AND status = 1 ', [username], callback);
};
