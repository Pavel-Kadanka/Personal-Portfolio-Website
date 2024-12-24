import { getConnection } from '../database';

export default defineEventHandler(async (event) => {
  let connection; // Define connection outside the try block

  try {
    // Get the database connection from the external file
    connection = await getConnection();

    // Query the 'projects' table
    const [rows] = await connection.execute('SELECT * FROM projects');

    // Return the result as JSON
    return rows;
  } catch (error) {
    // Return error response in case of failure
    return { error: 'Database query error: ' + error.message };
  } finally {
    // Close the connection if it's defined
    if (connection) {
      await connection.end();
    }
  }
});