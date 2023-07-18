const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const cloudinary = require("cloudinary");
const PORT = process.env.PORT || 5000;

// Uncaught Exceptions

process.on('uncaughtException', (error) => {
    console.log(`Error: ${error.message}`);
    console.log("Shutting down server due to uncaught exception");
    server.close(() => {
        process.exit(1);
    });

});



require("dotenv").config({ path: "backend/config/config.env" });

//Connecting to database

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  

const server = app.listen(PORT, () => {
    console.log(`Server running on Port : ${PORT}`);
});

//Unhandled promise rejection

process.on('unhandledRejection', error => {
    console.log(`Error: ${error.message}`);
    console.log('Shutting down the server');

    server.close(() => {process.exit(1);
    });
});