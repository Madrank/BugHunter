const express = require('express');
const { Solution, Bug } = require('../models');
const auth = require('../middleware/auth');
const Diff = require('diff');

const router = express.Router();

function generateDiff(original, fixed) {
  const differences = Diff.diffLines(original, fixed);
  let diffText = '';
  
  differences.forEach(part => {
    const prefix = part.added ? '+' : part.removed ? '-' : ' ';
    const lines = part.value.split('\n');
    lines.forEach(line => {
      if (line.trim() || part.added || part.removed) {
        diffText += `${prefix} ${line}\n`;
      }
    });
  });
  
  return diffText;
}

router.post('/:bugId', auth, async (req, res) => {
  try {
    const { code_fix, explanation } = req.body;
    const bug = await Bug.findByPk(req.params.bugId);
    
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }
    
    const diff_text = generateDiff(bug.code_snippet, code_fix);
    
    const solution = await Solution.create({
      code_fix,
      explanation,
      diff_text,
      BugId: req.params.bugId,
      UserId: req.user.id
    });
    
    res.json(solution);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;