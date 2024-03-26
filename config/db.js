const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose
    .connect(process.env.DB_URI, {})
    .then((data) =>
      console.log(`Database connected with ${data.connection.host}`)
    );
};

module.exports = connectToDb;
