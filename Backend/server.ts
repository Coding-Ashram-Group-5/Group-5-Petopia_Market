import dotenv from 'dotenv';
import app from './src/index';
import connectDB from './src/DB/connectDB';

// Load environment variables
dotenv.config();

// Define the shape of environment configuration
interface EnvConfig {
    port: number;
    host: string;
}

// Retrieves configuration for the application
function getConfig(): EnvConfig {
    return {
        port: parseEnvPort(process.env.PORT),
        host: process.env.HOST ?? 'localhost'
    };
}

// Parses the PORT environment variable ensuring it returns a valid number
function parseEnvPort(port: string | undefined): number {
    if (!port) {
        console.log("No PORT environment variable set, using default port 3008.");
        return 3008; // Return default port if input is null or an empty string
    }
    const parsedPort = parseInt(port, 10);
    if (isNaN(parsedPort)) {
        console.log("Invalid PORT environment variable, using default port 3008.");
        return 3008; // Return default port if parsing fails
    }
    return parsedPort;
}

// Retrieve configuration settings
const config: EnvConfig = getConfig();

// Connect to the database and start the server
connectDB()
    .then(() => {
        app.listen(config.port, config.host, () => {
            console.log(`⚡ Server is running on ${config.host}`);
            console.log(`⚛️ PORT: ${config.port}`);
            console.log(`⚡ Server is running at http://${config.host}:${config.port}/`);
        });
    })
    .catch((err) => {
        console.error('😵 Error while trying to connect to the database:', err.message);
    });
