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
            'INSERT INTO users (user_name, email, password) VALUES (?,?,?)',
            [user_name, email, password]
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