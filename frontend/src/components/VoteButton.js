import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function VoteButton({ solutionId, initialScore }) {
  const [score, setScore] = useState(initialScore);
  const [userVote, setUserVote] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleVote = async (value) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to vote');
      return;
    }
    
    setLoading(true);
    try {
      await axios.post(`${API_URL}/votes/${solutionId}`, 
        { vote_value: value },
        { headers: { 'x-auth-token': token } }
      );
      
      // Update local state
      if (userVote === value) {
        // Remove vote
        setScore(score - value);
        setUserVote(null);
      } else {
        // Change or add vote
        if (userVote) {
          setScore(score - userVote + value);
        } else {
          setScore(score + value);
        }
        setUserVote(value);
      }
    } catch (error) {
      console.error('Error voting:', error);
      alert('Error voting');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleVote(1)}
        disabled={loading}
        className={`px-3 py-1 rounded ${userVote === 1 ? 'bg-green-600' : 'bg-gray-600'} hover:bg-green-700 transition`}
      >
        👍 {score > 0 && `(${score})`}
      </button>
      <button
        onClick={() => handleVote(-1)}
        disabled={loading}
        className={`px-3 py-1 rounded ${userVote === -1 ? 'bg-red-600' : 'bg-gray-600'} hover:bg-red-700 transition`}
      >
        👎
      </button>
    </div>
  );
}

export default VoteButton;