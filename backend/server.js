const app = require("./app");
const dotenv = require('dotenv');
const connectDatabse = require("./config/database");
/**
 * Handling Uncaught Exception
 */
process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Uncaught Exception`);
    server.close(() => process.exit(1));
});
dotenv.config({ path: "backend/config/config.env" });

//Connecting to DB
connectDatabse();
const server = app.listen(process.env.PORT, () => console.log(`Server is listerning on port :${process.env.PORT}`));

/**
 * Unhandled promiss rejection
 * such wrong mongodb connection String
 */
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled rejection`);
    server.close(() => process.exit(1));
});
