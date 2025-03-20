const mongoose = require("mongoose");

const connectToDb = () => {
    mongoose
        .connect(process.env.DB_URI, {})
        .then((data) => {
            console.log(
                `Port: ${data.connection.port || "default MongoDB port"}`
            );
        })
        .catch((error) => {
            console.error(`Error connecting to the database: ${error.message}`);
        });
};

module.exports = connectToDb;
