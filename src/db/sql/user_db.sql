CREATE TABLE IF NOT EXISTS user (
    account_id VARCHAR(255) UNIQUE NOT NULL,
    account_pwd VARCHAR(255) NOT NULL,
    user_level INT DEFAULT 1,
    user_experience INT DEFAULT 0,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);