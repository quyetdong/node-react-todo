import mongoose from 'mongoose';

const { MONGO_URI } = process.env;
const { connect } = mongoose;

export function connectDb() {
  // Connecting to the database
  connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log('*** ', MONGO_URI)

      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
}
