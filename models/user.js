
const db = require('../config/database');

exports.getAllUsers = function(callback) {
    db.query('SELECT * FROM user_profile', callback);
};

exports.getUserById = function(oid, callback) {
    db.query('SELECT * FROM user_profile WHERE oid = ?', [oid], callback);
};

exports.createUser = function(newUser, callback) {
    const sql = "INSERT INTO user_profile (usergroup, uuid, username, password, email, displayname, ngos, schools, village, taluka, district, createdby) VALUES ?";
    let valuesArr = [];
    for(var i=0; i < newUser.length; i++)   
        valuesArr.push([newUser[i].usergroup, newUser[i].uuid,newUser[i].username, newUser[i].password, newUser[i].email, newUser[i].displayname, newUser[i].ngos, newUser[i].schools, newUser[i].village, newUser[i].taluka, newUser[i].district, newUser[i].createdby]);
    
    db.query(sql, [valuesArr], callback);
};

exports.updateUser = function(oid, updatedUser, callback) {    
    let sql = "UPDATE user_profile SET usergroup = ?, username = ?, password = ?, email = ?, displayname = ?, ngos = ?, schools = ?, village = ?, taluka = ?, district = ?, updatedby = ?  WHERE oid = ? "; 
    let valuesArr = [updatedUser['usergroup'],updatedUser['username'] ,updatedUser['password'] ,updatedUser['email'] ,updatedUser['displayname'] ,updatedUser['ngos'] ,updatedUser['schools'] ,updatedUser['village'] ,updatedUser['taluka'] ,updatedUser['district'] ,updatedUser['updatedby'], oid]; 
    if(!updatedUser.hasOwnProperty('password')){
        sql = "UPDATE user_profile SET usergroup = ?, username = ?, email = ?, displayname = ?, ngos = ?, schools = ?, village = ?, taluka = ?, district = ?, updatedby = ?  WHERE oid = ? ";
        valuesArr =  [updatedUser['usergroup'],updatedUser['username'] ,updatedUser['email'] ,updatedUser['displayname'] ,updatedUser['ngos'] ,updatedUser['schools'] ,updatedUser['village'] ,updatedUser['taluka'] ,updatedUser['district'] ,updatedUser['updatedby'], oid];
    }
    db.query(sql, valuesArr, callback);
};

exports.deleteUser = function(oid, callback) {
    db.query('DELETE FROM user_profile WHERE oid = ?', [oid], callback);
};