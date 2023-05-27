const mongoose = require("mongoose");
const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    console.log("Already Connected to the database.");
    return;
  }

  const DB = process.env.MONGODB_DATABASE_URL.replace(
    "<password>",
    process.env.MONGODB_DATABASE_PASSWORD
  );

  const database = await mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("New DB connection successful!");

  connection.isConnected = database.connections[0].readyState;

  // This is the new code to handle hot module replacement
  if (
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_IS_DEV_SERVER
  ) {
    await mongoose.disconnect();
    connection.isConnected = false;
  }
}

async function disconnectDb() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production");
    await mongoose.disconnect();
    connection.isConnected = false;
  } else {
    console.log("Not disconnecting from the database.");
  }
}

const db = { connectDb, disconnectDb };

export default db;
