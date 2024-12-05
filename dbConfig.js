const sql = require('mssql');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // Use encryption
        trustServerCertificate: true, // Necessary for local dev
    },
};

const connectDb = () => {
    return sql.connect(config)
        .then(() => {
            console.log("Connected to SQL Server");
        })
        .catch(err => {
            console.error("Error connecting to database", err);
            process.exit(1); // Exit the application on database connection failure
        });
};

module.exports = { connectDb, sql };
