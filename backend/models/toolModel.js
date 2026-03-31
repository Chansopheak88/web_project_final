import db from '../config/db.js';

const Tool = {
    // 1. Get all tools with their category names (using a JOIN)
    getAll: async () => {
        try {
            const sql = `
                SELECT tools.*, categories.name AS category_name 
                FROM tools 
                LEFT JOIN categories ON tools.category_id = categories.id
            `;
            const [rows] = await db.query(sql);
            return rows;
        } catch (err) {
            throw err;
        }
    },

    // 2. Get a single tool by its ID
    getById: async (id) => {
        try {
            const [rows] = await db.query('SELECT * FROM tools WHERE id = ?', [id]);
            return rows[0];
        } catch (err) {
            throw err;
        }
    },

    // 3. Add a new tool to the database
    create: async (toolData) => {
        try {
            const { 
                name, category_id, dob, description, platform, 
                risk_level, official_source, command_example, 
                video_link, created_by 
            } = toolData;

            const sql = `
                INSERT INTO tools 
                (name, category_id, dob, description, platform, risk_level, official_source, command_example, video_link, created_by) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            
            const [result] = await db.query(sql, [
                name, category_id, dob, description, platform, 
                risk_level, official_source, command_example, 
                video_link, created_by
            ]);
            
            return result.insertId;
        } catch (err) {
            throw err;
        }
    },

    // 4. Delete a tool
    delete: async (id) => {
        try {
            await db.query('DELETE FROM tools WHERE id = ?', [id]);
            return true;
        } catch (err) {
            throw err;
        }
    }
};

export default Tool;