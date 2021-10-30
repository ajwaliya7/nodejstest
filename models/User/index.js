const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Int32 = require('mongoose-int32');

const UserSchema = new Schema({
    user_id: { type: String, required: true },
    name: { type: String },
    surname: { type: String },
    email: { type: String },
    phone: { type: Int32 },
    location: {
        latitude: { type: String },
        longitude: { type: String}
    },
    created_at : {type : Date, default: new Date()}
},{versionKey: false});

module.exports = mongoose.model('users', UserSchema);