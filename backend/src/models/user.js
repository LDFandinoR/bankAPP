const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: { type: String},
    email: { type: String, require: true},
    balance: { type: Number}

}, {
    timestamps: true
});

module.exports = model('User', userSchema); 