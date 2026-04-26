const express = require('express');
const { Bug, User } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// GET all bugs
router.get('/', async (req, res) => {
  try {
    const bugs = await Bug.findAll({
      include: [{ model: User, attributes: ['username'] }],
      order: [['created_at', 'DESC']]
    });
    res.json(bugs);
  } catch (err) {
    console.error('Error in GET /:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET single bug
router.get('/:id', async (req, res) => {
  try {
    const bug = await Bug.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username', 'reputation'] },
        { model: require('../models').Solution, include: [require('../models').User, require('../models').Vote] }
      ]
    });
    
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }
    
    res.json(bug);
  } catch (err) {
    console.error('Error in GET /:id:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST new bug
router.post('/', auth, async (req, res) => {
  try {
    console.log('Creating bug for user:', req.user.id);
    console.log('Request body:', req.body);
    
    const { title, code_snippet, description, language } = req.body;
    
    const bug = await Bug.create({
      title,
      code_snippet,
      description,
      language,
      UserId: req.user.id
    });
    
    console.log('Bug created:', bug.id);
    res.status(201).json(bug);
  } catch (err) {
    console.error('Error in POST /:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;