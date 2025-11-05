import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Create PostgreSQL connection pool
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10),
});

//Function to test database connection
export const testDBConnection = async() => {
    try {
        const client = await pool.connect();
        const res = await client.query("SELECT NOW()");
        console.log("Connect to PostgreSQL at: ", res.rows[0].now);
        
        client.release();
        
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
        
    }
}