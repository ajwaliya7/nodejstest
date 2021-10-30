const express = require('express'),
    router = express.Router(),
    UserSchema = require("../../models/User/index");

router.get("/", function (req, res) {
    // heres
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