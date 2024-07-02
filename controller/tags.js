const db = require('../db');

const addTag = (req, res) => {
    const { tag } = req.body;
    pool.query('INSERT INTO tags (tag) VALUES (?)', [tag], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to add tag' });
        }
        res.status(201).json({ message: 'tag added successfully' });
    });
};

const getAll = (req, res) => {
    db.query('SELECT * FROM tags', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.status(200).json(results);
        }
    });
};

module.exports = { addTag, getAll }