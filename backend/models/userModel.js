import db from '../config/db.js';

class User {
    // Fetch all users
    static fetchAll() {
        return db.execute('SELECT * FROM users');
    }

    // Save new user
    static save(user_name, email, password) {
        return db.execute(
            'INSERT INTO users (user_name, email, password, auth_provider) VALUES (?,?,?,?)',
            [user_name, email, password, 'local']
        );
    }

    static createGoogleUser({ user_name, email, password, google_id, avatar_url }) {
        return db.execute(
            `INSERT INTO users (user_name, email, password, auth_provider, google_id, avatar_url, last_login_at)
             VALUES (?,?,?,?,?,?,NOW())`,
            [user_name, email, password, 'google', google_id, avatar_url]
        );
    }

    static updateGoogleUser(id, { user_name, google_id, avatar_url }) {
        return db.execute(
            `UPDATE users
             SET user_name = ?,
                 auth_provider = ?,
                 google_id = ?,
                 avatar_url = ?,
                 last_login_at = NOW()
             WHERE id = ?`,
            [user_name, 'google', google_id, avatar_url, id]
        );
    }

    static updateLocalLastLogin(id) {
        return db.execute(
            'UPDATE users SET last_login_at = NOW() WHERE id = ?',
            [id]
        );
    }

    static findByEmail(email) {
        return db.execute(
            'SELECT * FROM users WHERE email = ? LIMIT 1',
            [email]
        );
    }

    static findById(id) {
        return db.execute(
            'SELECT * FROM users WHERE id = ? LIMIT 1',
            [id]
        );
    }

    static loginUser(email) {
        return db.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
    }

    // Search user by user_name
    static findUser(user_name) {
        return db.execute(
            'SELECT * FROM users WHERE user_name LIKE ?',
            [`%${user_name}%`]
        );
    }

    // Admin APIs
    static fetchAdminUsers({ query = '', status = 'all' } = {}) {
        const where = [];
        const params = [];

        if (query) {
            where.push('(user_name LIKE ? OR email LIKE ?)');
            params.push(`%${query}%`, `%${query}%`);
        }

        if (status && status !== 'all') {
            where.push('status = ?');
            params.push(status);
        }

        const whereSql = where.length > 0 ? `WHERE ${where.join(' AND ')}` : '';

        return db.execute(
            `SELECT id, user_name, email, role, status, auth_provider, avatar_url, last_login_at, created_at
             FROM users
             ${whereSql}
             ORDER BY id DESC`,
            params
        );
    }

    static createAdminUser({ user_name, email, password, role = 'User', status = 'active', auth_provider = 'local' }) {
        return db.execute(
            `INSERT INTO users (user_name, email, password, role, status, auth_provider)
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
        );
    }
}

export default User;
