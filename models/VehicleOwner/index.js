const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Int32 = require('mongoose-int32');

const vehicleOwnerSchema = new Schema({
    vehicle_uuid: { type: String, required: true },
    user_uuid: { type: String, required: true },
    createdAt: {type : Date, default: new Date()},
    isDeleted: { type : Int32, default: 0},
},{versionKey: false});

module.exports = mongoose.model('vehicleowners', vehicleOwnerSchema);