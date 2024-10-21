const mongoose = require("mongoose");

const connectToDb = () => {
    console.log(`Connecting to MongoDB with URI: ${process.env.DB_URI}`);

    mongoose
        .connect(process.env.DB_URI, {})
        .then((data) => {
            console.log(
                `Database connected with host: ${data.connection.host}`
            );
            console.log(
                `Port: ${data.connection.port || "default MongoDB port"}`
            );
            console.log(
                `Is Localhost: ${
                    data.connection.host.includes("localhost") ? "Yes" : "No"
                }`
            );
        })
        .catch((error) => {
            console.error(`Error connecting to the database: ${error.message}`);
        });
};

module.exports = connectToDb;
