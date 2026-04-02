// import db from '../config/db.js';

// class User {
//     static fetchAll() {
//         return db.execute('SELECT * FROM users');
//     }

//     static save(user_name, email, password) {
//         return db.execute(
//             'INSERT INTO users (user_name, email, password) VALUES (?,?,?)',
//             [user_name,email, password]
//         );
//     }

//     static loginUser(email) {
//         return db.execute(
//             'SELECT * FROM users WHERE email = ?',
//             [email]
//         );
//     }

//     static findUser(user_name) {
//         return db.execute(
//             'SELECT * FROM users WHERE  LIKE ?',
//             [`%${user_name}%`]
//         );
//     }
// }

// export default User;

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
}

export default User;
