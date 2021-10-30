const http = require('http'),
    express = require("express"),
    app = express(),
    mongoDBConnectionHelper = require("./helper/dbHelper");

mongoDBConnectionHelper.ConnectMongoDB();

let baseRoute = '/api/v1';
app.use(baseRoute+'/user_owned_vechicles',require('./controller/user')),
app.use(baseRoute+'/vehicles',require('./controller/vehicle')),

app.all("/*", function (req, res, next) {   
    let responseData = {
        responseCode: 2,
        message: 'No any route found',
        data: {}
    }
    return res.status(404).json(responseData).end();   
});

const port = 8080;
const server = http.createServer(app).listen(port,'0.0.0.0', () => console.log(`Server running on port ${port}`));
server.timeout = 241000;