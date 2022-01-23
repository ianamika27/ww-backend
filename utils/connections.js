const mongoose = require('mongoose');
exports.connect = () => {

    //mongoose.set('useNewUrlParser', true);
    //mongoose.set('useFindAndModify', false);
    //mongoose.set('useCreateIndex', true);
    //mongoose.set('useUnifiedTopology', true)

    mongoose.connect(process.env.DB_URI);

    mongoose.connection.on('connected', () => {
        console.log(`Connected to ${process.env.NODE_ENV || "Development"} Database`);
    });
    mongoose.connection.on('error', (err) => {
        console.error(`Error Occured While Connecting to ${process.env.NODE_ENV} Database`);
    });
    mongoose.connection.on('disconnect', () => {
        console.log(`Disconnected From ${process.env.NODE_ENV} Database-`)
    });
}


exports.disconnect = function() {
    mongoose.disconnect((err) => {
        console.error(`Error Occured While Disconnecting from ${process.env.NODE_ENV} Database ❌🚫`);
    });
}