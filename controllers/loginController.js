// controllers/userController.js
const Login = require('../models/login');
//
const bcrypt = require('bcrypt');
exports.validatedUser = function(req, res) {  
    Login.validatedUser(req.body.username, (err, user) => {
        if (err) 
            res.json({ message: err.message});
        else{
            if(Object.keys(user).length > 0){
                bcrypt.compare(req.body.password, user[0]['password'], (err, result) => {
                    if (err) {
                        // Handle error
                        console.error('Error comparing passwords:', err);
                        return;
                    }
                
                if (result){ 
                    req.session.IsLoggedIn = true;
                    req.session.user = user[0];
                    res.json({ message: 'Successful. Redirecting Please wait.', status: true,data: req.session.user});
                }
                 else
                    res.json({ message: 'Invalid Username/Password', status: false, data: []});                
                });
            }
            else
                res.json({ message: 'Invalid Username/Password', status: false, data: []});
        }
    });    
};

