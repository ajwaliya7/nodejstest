const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    vehicle_name: { type: String },
    vehicle_brand: { type: String },
    vehicle_number: { type: String },
    vehicle_id: { type: String, required: true },
    created_at : {type : Date, default: new Date()}
},{versionKey: false});

module.exports = mongoose.model('vehicles', vehicleSchema);