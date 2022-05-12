const { connect } = require("mongoose");
const connectDatabase = () => {
    connect(process.env.DB_URI).then((data) => {
        console.log(`Alhamdu lillah, mongodb Connected with server: ${data.connection.host}`);
    });
}
module.exports = connectDatabase;