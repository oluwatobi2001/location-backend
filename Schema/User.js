const userSchema = `

CREATE TABLE IF NOT EXISTS users (
    userID  INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
)


`;


module.exports = userSchema