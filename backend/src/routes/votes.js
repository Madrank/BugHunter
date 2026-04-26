const express = require('express');
const { Vote, Solution, User } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/:solutionId', auth, async (req, res) => {
  try {
    const { vote_value } = req.body;
    const solutionId = req.params.solutionId;
    
    const existingVote = await Vote.findOne({
      where: { SolutionId: solutionId, UserId: req.user.id }
    });
    
    if (existingVote) {
      await existingVote.update({ vote_value });
    } else {
      await Vote.create({
        vote_value,
        SolutionId: solutionId,
        UserId: req.user.id
      });
      
      // Update reputation
      const solution = await Solution.findByPk(solutionId, {
        include: [{ model: User }]
      });
      
      if (solution && solution.User) {
        const reputationChange = vote_value === 1 ? 10 : -2;
        await solution.User.increment('reputation', { by: reputationChange });
      }
    }
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;