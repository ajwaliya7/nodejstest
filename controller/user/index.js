const express = require('express'),
    router = express.Router(),
    validator = require('validator'),
    VehicleOwnerSchema = require("../../models/VehicleOwner/index"),
    VehicleSchema = require("../../models/Vehicle/index");

router.get("/:userId", function (req, res) {
    let Response;
    let request = req.body;
    try {
        if (typeof req.params.userId != 'undefined' && (!validator.isAlphanumeric(req.params.userId+'') || req.params.userId.length != 5)) {
            Response = {
                responseCode: 1,
                message: "Please enter valid userId",
                data: {}
            };
            return res.status(200).json(Response);
        } else {
            let whereCondition = { user_uuid : req.params.userId };
            let selectFields = {_id: false, vehicle_uuid : true };
            VehicleOwnerSchema.find(whereCondition, selectFields).lean().then(data => {
                if (data && Object.keys(data).length > 0) {
                    let vehicles = [];
                    data.forEach(async function(obj) {
                        vehicles.push(obj.vehicle_uuid);
                    })

                    if(vehicles.length){
                        let whereCondition = { vehicle_id : { $in : vehicles} };
                        let selectFields = {_id: false };
                        VehicleSchema.find(whereCondition, selectFields).then(data => {
                            if (data && Object.keys(data).length > 0) {
                                Response = {
                                    responseCode: 0,
                                    message: 'vehicle details found successfully',
                                    data: data
                                };
                                return res.status(200).json(Response).end();
                            } else {
                                Response = {
                                    responseCode: 1,
                                    message: 'No any record found for vehicle details',
                                    data: {}
                                };
                                return res.status(200).json(Response).end();
                            }
                        });
                    } else {
                        Response = {
                            responseCode: 1,
                            message: 'No any record found for vehicle details',
                            data: {}
                        };
                        return res.status(200).json(Response).end();
                    }
                } else {
                    Response = {
                        responseCode: 1,
                        message: 'No any record found for vehicle details',
                        data: {}
                    };
                    return res.status(200).json(Response).end();
                }
            }).catch(error => {
                Response = {
                    responseCode: 9,
                    message: 'Internal Error',
                    data: {}
                };
                return res.status(500).json(Response).end();
            });
        }       
    } catch (e) {
        Response = {
            responseCode: 9,
            message: 'Internal Error',
            data: {}
        }
        return res.status(500).json(Response).end();
    }
});

router.all("/*", function (req, res, next) {   
    let responseData = {
        responseCode: 2,
        message: 'Plase enter valid user route',
        data: {}
    }
    return res.status(404).json(responseData).end();   
});

module.exports = router;