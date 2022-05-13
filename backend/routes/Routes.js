//Import Routes
const product = require('./productRoute');
const user = require('./userRoute');
const order = require('./orderRoute');
const Routes = [
    product, user, order
];
module.exports = (app) => {
    app.use()
}