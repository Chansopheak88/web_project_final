import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

<<<<<<< HEAD
// 1. Register a new user
export async function createUser(req, res) {
    const { first_name, last_name, email, password, confirmPassword } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    if (password.trim() !== confirmPassword.trim()) {
        return res.status(400).json({ success: false, message: "Passwords do not match." });
=======
export async function getCreateUser(req, res) {
    try {
        res.render('users/userIndex', { layout: 'templates/mains', title: 'Users' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

export async function createUser(req, res) {
    if (!req.body) {
        return res.status(400).send("Request body is missing");
    }
    const {user_name, email, password, confirmPassword} = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match.");
>>>>>>> 0d6948a627533ef766519f9bf2797a05cacbdd0e
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
<<<<<<< HEAD
        await User.save(first_name, last_name, email, hashedPassword);
        
        return res.status(201).json({ success: true, message: "User created successfully." });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: "Email already exists." });
        }
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// 2. Login user
=======
        await User.save(user_name, email, hashedPassword);
        // res.redirect('/create');
        return res.status(201).send("User created successfully.");
    } catch (error) {
        console.error(error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).send("Email already exists.");
        }

        res.status(500).send("Server Error");
    }
}

export async function login(req, res) {
    try {
        res.render('users/login', { layout: 'templates/mains', title: 'Login' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

>>>>>>> 0d6948a627533ef766519f9bf2797a05cacbdd0e
export async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const [rows] = await User.loginUser(email);

<<<<<<< HEAD
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
=======
        if (rows.length === 0) return res.send("User not found");
>>>>>>> 0d6948a627533ef766519f9bf2797a05cacbdd0e

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            req.session.userId = user.id;
<<<<<<< HEAD
            req.session.userName = `${user.first_name} ${user.last_name}`;
            
            return res.json({ 
                success: true, 
                message: "Login successful",
                user: { id: user.id, name: `${user.first_name} ${user.last_name}` } 
            });
        }

        res.status(401).json({ success: false, message: "Wrong password" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

// 3. Get all users (for React list components)
export async function listUser(req, res) {
    try {
        const [rows] = await User.fetchAll();
        res.json({ success: true, users: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// 4. Search for a user
=======
            req.session.userName = user.first_name;
            return res.redirect('/dashboard');
        }

        res.send("Wrong password");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function listUser(req, res) {
    try {
        const [rows] = await User.fetchAll();

        res.render('users/list', {
            layout: 'templates/mains',
            title: 'Users',
            users: rows,
            userName: req.session.userName
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

>>>>>>> 0d6948a627533ef766519f9bf2797a05cacbdd0e
export async function findUser(req, res) {
    try {
        const { firstName } = req.body;
        const [rows] = await User.findUser(firstName);
<<<<<<< HEAD
        res.json({ success: true, users: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

/* 
  NOTE: getCreateUser and login are removed because React 
  will handle those pages on the frontend.
*/
=======

        res.render('users/list', {
            layout: 'templates/mains',
            title: 'Find User',
            users: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
>>>>>>> 0d6948a627533ef766519f9bf2797a05cacbdd0e
