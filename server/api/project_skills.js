import { getConnection } from '../database';

export default defineEventHandler(async (event) => {
    let connection;

    try {
        // Get the database connection from the external file
        connection = await getConnection();

        // Get the project_id from the request (if needed)
        const { project_id } = getQuery(event); // If project_id is passed as a query parameter

        // Query the 'project_skills' table for the specific project_id
        const [rows] = await connection.execute(
            'SELECT vue, nuxt, javascript, php, laravel, python, html, css, tailwind, typescript FROM project_skills WHERE project_id = ?',
            [project_id]
        );

        // Check if rows were returned
        if (rows.length === 0) {
            return { error: 'No data found for the specified project_id' };
        }

        const skillRow = rows[0];

        // Filter out skills with null values
        const skills = [
            { name: '.html', percentage: skillRow.html },
            { name: '.css', percentage: skillRow.css },
            { name: '.ts', percentage: skillRow.typescript },
            { name: '.js', percentage: skillRow.nuxt },
            { name: '.php', percentage: skillRow.php },
            { name: '.py', percentage: skillRow.laravel },
        ].filter(skill => skill.percentage !== null); // Filter out null values

        // Return the array of skills as JSON
        return skills;
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