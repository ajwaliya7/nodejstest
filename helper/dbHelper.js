const mongoose = require("mongoose"),
    db = 'mongodb+srv://raj:rajTEST@cluster0.skbgb.mongodb.net/test';
var mongoDB = mongoose.connection,
    timeout = 100,
    limit = 10,
    counter = 0;

function MongoDBConnection() {
    try{
        if (mongoose.connection.readyState === 0 && mongoose.connection.readyState !== 2 && mongoose.connection.readyState !== 1) {
            let mongoDBConnectionOption = {
                auto_reconnect: true,
                autoIndex: false,
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
            mongoose.connect(db, mongoDBConnectionOption)
        }
    }catch(e){

    }

}
mongoDB.on('connected', function(){
    timeout = 100;
    counter = 0;
});
mongoDB.on('error', function (error) {
    console.log(error)
});

// handle disconnect event in mongodb
mongoDB.on('disconnected', function () {

    counter++;
    if(counter == 0){
        getIntervalTimeout(timeout);
    }else if(counter !== limit){
        timeout = timeout * 2;
        getIntervalTimeout(timeout);
    }else {
        console.log("===================== Reconnect Attempts Are Reached to Limit ======================")
    }
});

exports.ConnectMongoDB = function () {
    MongoDBConnection();
};

function getIntervalTimeout(timeout){
    setTimeout(MongoDBConnection, timeout);
}
