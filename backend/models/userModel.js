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