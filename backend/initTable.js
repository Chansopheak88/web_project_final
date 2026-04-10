import db from './config/db.js';

<<<<<<< HEAD
=======
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

async function tableExists(tableName) {
  const [rows] = await db.query(
    `SELECT TABLE_NAME
     FROM INFORMATION_SCHEMA.TABLES
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = ?`,
    [tableName]
  );

  return rows.length > 0;
}

>>>>>>> 0d6948a627533ef766519f9bf2797a05cacbdd0e
async function initTables() {
  try {
    // USERS TABLE
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
<<<<<<< HEAD
        password VARCHAR(255) NOT NULL,
=======
        password VARCHAR(255) NULL,
        role VARCHAR(30) NOT NULL DEFAULT 'User',
        status ENUM('active','pending','suspended') NOT NULL DEFAULT 'active',
        auth_provider VARCHAR(20) NOT NULL DEFAULT 'local',
        google_id VARCHAR(191) NULL UNIQUE,
        avatar_url TEXT NULL,
        last_login_at DATETIME NULL,
>>>>>>> 0d6948a627533ef766519f9bf2797a05cacbdd0e
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ users table ready");

<<<<<<< HEAD
=======
    // Backward-compatible migration for existing users table
    await db.query(`ALTER TABLE users MODIFY COLUMN password VARCHAR(255) NULL`);

    if (!(await columnExists('users', 'role'))) {
      await db.query(`ALTER TABLE users ADD COLUMN role VARCHAR(30) NOT NULL DEFAULT 'User'`);
    }

    // Make sure existing role default is User
    await db.query(`ALTER TABLE users MODIFY COLUMN role VARCHAR(30) NOT NULL DEFAULT 'User'`);

    if (!(await columnExists('users', 'status'))) {
      await db.query(`ALTER TABLE users ADD COLUMN status ENUM('active','pending','suspended') NOT NULL DEFAULT 'active'`);
    }

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

    // SECURITY ALERTS TABLE
    const hasSecurityAlerts = await tableExists('security_alerts');
    if (!hasSecurityAlerts) {
      await db.query(`
        CREATE TABLE security_alerts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          severity ENUM('Low','Medium','High') NOT NULL DEFAULT 'Low',
          title VARCHAR(191) NOT NULL,
          detail TEXT NOT NULL,
          is_resolved TINYINT(1) NOT NULL DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await db.query(`
        INSERT INTO security_alerts (severity, title, detail)
        VALUES
        ('High', 'Multiple failed login attempts', 'Authentication threshold exceeded for one client IP'),
        ('Medium', 'New admin route access', 'Admin routes were accessed in the last hour'),
        ('Low', 'Routine backup complete', 'Database backup finished successfully')
      `);
    }

    console.log("✅ security_alerts table ready");

>>>>>>> 0d6948a627533ef766519f9bf2797a05cacbdd0e
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

<<<<<<< HEAD
initTables();
=======
initTables();
>>>>>>> 0d6948a627533ef766519f9bf2797a05cacbdd0e
