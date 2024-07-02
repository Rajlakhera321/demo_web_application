const db = require('../db');

const create = (req, res) => {
    const { user_id, title, content, tags } = req.body;

    db.query('INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)', [user_id, title, content], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            const postId = results.insertId;
            const tagValues = tags.map(tagId => [postId, tagId]);

            db.query('INSERT INTO post_tags (post_id, tag_id) VALUES ?', [tagValues], (err) => {
                if (err) {
                    res.status(500).json({ error: 'Database error' });
                } else {
                    res.status(201).json({ message: 'Post created' });
                }
            });
        }
    });
};

const getAll = (req, res) => {
    db.query(`
        SELECT p.*, GROUP_CONCAT(t.name) AS tags 
        FROM posts p
        LEFT JOIN post_tags pt ON p.id = pt.post_id
        LEFT JOIN tags t ON pt.tag_id = t.id
        GROUP BY p.id
    `, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.status(200).json(results);
        }
    });
};

const getById = (req, res) => {
    const { id } = req.params;

    db.query(`
        SELECT p.*, GROUP_CONCAT(t.name) AS tags 
        FROM posts p
        LEFT JOIN post_tags pt ON p.id = pt.post_id
        LEFT JOIN tags t ON pt.tag_id = t.id
        WHERE p.id = ?
        GROUP BY p.id
    `, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Post not found' });
        } else {
            res.status(200).json(results[0]);
        }
    });
};

const update = (req, res) => {
    const { id } = req.params;
    const { title, content, tags } = req.body;

    db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            db.query('DELETE FROM post_tags WHERE post_id = ?', [id], (err) => {
                if (err) {
                    res.status(500).json({ error: 'Database error' });
                } else {
                    const tagValues = tags.map(tagId => [id, tagId]);

                    db.query('INSERT INTO post_tags (post_id, tag_id) VALUES ?', [tagValues], (err) => {
                        if (err) {
                            res.status(500).json({ error: 'Database error' });
                        } else {
                            res.status(200).json({ message: 'Post updated' });
                        }
                    });
                }
            });
        }
    });
};

const deletepost = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.status(200).json({ message: 'Post deleted' });
        }
    });
};

module.exports = { create, getAll, getById, update, deletepost }