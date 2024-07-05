require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {});
    console.log("connected to mongodb ");
  } catch (error) {
    console.error("error connecting to mongodb:", error);
    process.exit(1);
  }
};

module.exports = connection;
