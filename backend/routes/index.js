//Import Routes
// const product = require('./productRoute');
// const user = require('./userRoute');
// const order = require('./orderRoute');
const path = '/api/v1';
const routes = [
    {
        // path: "/api/v1",
        handler: require('./productRoute')//product
    },
    {
        handler: require('./userRoute')//user
    },
    {
        handler: require('./orderRoute')//order
    },
];


module.exports = (app) => {
    routes.forEach(route => app.use(path, route.handler));
}