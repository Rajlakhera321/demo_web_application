const pool = require("../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to register user' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
};

const userAuthentication = (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err || results.length === 0) {
            res.status(400).json({ error: 'Invalid username or password' });
        } else {
            const user = results[0];
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
                res.status(200).json({ token });
            } else {
                res.status(400).json({ error: 'Invalid username or password' });
            }
        }
    });
  };

module.exports = {createUser, userAuthentication}