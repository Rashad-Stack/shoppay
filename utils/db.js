const mongoose = require("mongoose");
const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    console.log("Already Connected to the database.");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("Use previous connection to the database.");
      return;
    }
    await mongoose.disconnect();
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
