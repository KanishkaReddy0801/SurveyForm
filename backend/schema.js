const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    name: {type:String , require: true},
    email: {type:String , require: true , unique: true},
    phone:{type:Number, require:true, unique: true},
    profession:{type:String},
    password: {type:String,Number , require: true},
    confirmpassword:{type:String,Number, require:true},
},{collection: 'UserInformation'}
)

const models = mongoose.model('UserInformation' , Users);

module.exports = models;