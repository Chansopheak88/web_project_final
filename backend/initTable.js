import db from './config/db.js';

async function columnExists(tableName, columnName) {
  const [rows] = await db.query(
    `SELECT COLUMN_NAME
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = ?
       AND COLUMN_NAME = ?`,
    [tableName, columnName]
  );

  return rows.length > 0;
}

async function initTables() {
  try {
    // USERS TABLE
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NULL,
        auth_provider VARCHAR(20) NOT NULL DEFAULT 'local',
        google_id VARCHAR(191) NULL UNIQUE,
        avatar_url TEXT NULL,
        last_login_at DATETIME NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ users table ready");

    // Backward-compatible migration for existing users table
    await db.query(`ALTER TABLE users MODIFY COLUMN password VARCHAR(255) NULL`);
    if (!(await columnExists('users', 'auth_provider'))) {
      await db.query(`ALTER TABLE users ADD COLUMN auth_provider VARCHAR(20) NOT NULL DEFAULT 'local'`);
    }
    if (!(await columnExists('users', 'google_id'))) {
      await db.query(`ALTER TABLE users ADD COLUMN google_id VARCHAR(191) NULL UNIQUE`);
    }
    if (!(await columnExists('users', 'avatar_url'))) {
      await db.query(`ALTER TABLE users ADD COLUMN avatar_url TEXT NULL`);
    }
    if (!(await columnExists('users', 'last_login_at'))) {
      await db.query(`ALTER TABLE users ADD COLUMN last_login_at DATETIME NULL`);
    }

    console.log("✅ users table migration checked");

    // CATEGORIES TABLE
    await db.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ categories table ready");

    // TOOLS TABLE
    await db.query(`
      CREATE TABLE IF NOT EXISTS tools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        category_id INT,
        dob DATE,
        description TEXT,
        platform VARCHAR(100),
        risk_level VARCHAR(50),
        official_source TEXT,
        command_example TEXT,
        video_link TEXT,
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
      )
    `);

    console.log("✅ tools table ready");

    process.exit();
  } catch (err) {
    console.error("❌ Error creating tables:", err.message);
    process.exit(1);
  }
}

initTables();
