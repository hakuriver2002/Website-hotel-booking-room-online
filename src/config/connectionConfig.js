var mongodb = require('mongoose');
var url = process.env.MONGO_URI;

class Connection {
    async _connect() {
        try {
            await mongodb.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            console.log('Connected to database successfully')
        } catch (error) {
            console.log(error)
            process.exit(1)
        }
    }
}

module.exports = new Connection();