const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`CONNECTED TO DB AT PORT: ${conn.connection.port}`);
        return true;
    } catch (err) {
        console.log('ERROR WHILE CONNECTING TO DB');
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;