import db from '../config/db.js';

class User {
    // Fetch all users
    static fetchAll() {
        return db.execute('SELECT * FROM users');
    }

    // Save new user
    static save(first_name, last_name, email, password) {
        return db.execute(
            'INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?)',
            [first_name, last_name, email, password]
        );
    }

    static loginUser(email) {
        return db.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
    }

    // Search user by first_name
    static findUser(first_name) {
        return db.execute(
            'SELECT * FROM users WHERE first_name LIKE ?',
            [`%${first_name}%`]
        );
    }
}

export default User;
             VALUES (?, ?, ?, ?, ?, ?)`,
            [user_name, email, password, role, status, auth_provider]
        );
    }

    static updateAdminUser(id, { user_name, email, role, status }) {
        return db.execute(
            `UPDATE users
             SET user_name = ?, email = ?, role = ?, status = ?
             WHERE id = ?`,
            [user_name, email, role, status, id]
        );
    }

    static updateStatus(id, status) {
        return db.execute('UPDATE users SET status = ? WHERE id = ?', [status, id]);
    }

    static deleteById(id) {
        return db.execute('DELETE FROM users WHERE id = ?', [id]);
    }

    static getAdminStats() {
        return db.execute(
            `SELECT
               COUNT(*) AS totalUsers,
               SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS activeSessions,
               SUM(CASE WHEN role = 'Admin' THEN 1 ELSE 0 END) AS moderators
             FROM users`
        );
    }

    static getOpenAlertsCount() {
        return db.execute(`SELECT COUNT(*) AS openAlerts FROM security_alerts WHERE is_resolved = 0`);
    }

    static getSecurityAlerts() {
        return db.execute(
            `SELECT id, severity, title, detail, is_resolved, created_at
             FROM security_alerts
             WHERE is_resolved = 0
             ORDER BY created_at DESC
             LIMIT 20`
        );
    }

    static createSecurityAlert({ severity = 'Low', title, detail }) {
        return db.execute(
            'INSERT INTO security_alerts (severity, title, detail) VALUES (?, ?, ?)',
            [severity, title, detail]
>>>>>>> 0d6948a627533ef766519f9bf2797a05cacbdd0e
        );
    }
}

<<<<<<< HEAD
export default User;
=======
export default User;
>>>>>>> 0d6948a627533ef766519f9bf2797a05cacbdd0e
