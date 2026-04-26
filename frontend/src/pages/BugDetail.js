import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CodeViewer from '../components/CodeViewer';
import DiffViewer from '../components/DiffViewer';
import VoteButton from '../components/VoteButton';

const API_URL = 'http://localhost:5000/api';

function BugDetail() {
  const { id } = useParams();
  const [bug, setBug] = useState(null);
  const [solution, setSolution] = useState({ code_fix: '', explanation: '' });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchBug();
  }, [id]);
  
  const fetchBug = async () => {
    try {
      const response = await axios.get(`${API_URL}/bugs/${id}`);
      setBug(response.data);
    } catch (error) {
      console.error('Error fetching bug:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const submitSolution = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to submit a solution');
      return;
    }
    
    try {
      await axios.post(`${API_URL}/solutions/${id}`, solution, {
        headers: { 'x-auth-token': token }
      });
      alert('Solution submitted!');
      setSolution({ code_fix: '', explanation: '' });
      fetchBug();
    } catch (error) {
      console.error('Error submitting solution:', error);
      alert('Error submitting solution');
    }
  };
  
  if (loading) return <div className="text-center">Loading...</div>;
  if (!bug) return <div className="text-center">Bug not found</div>;
  
  return (
    <div className="space-y-8">
      {/* Bug Details */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">{bug.title}</h1>
        <div className="flex gap-2 mb-4">
          <span className="bg-blue-600 px-2 py-1 rounded text-sm">{bug.language}</span>
          <span className="text-gray-400">by {bug.User?.username}</span>
          <span className="text-gray-400">⭐ {bug.User?.reputation} reputation</span>
        </div>
        <p className="text-gray-300 mb-4">{bug.description}</p>
        <h3 className="text-xl font-semibold mb-2">Code with bug:</h3>
        <CodeViewer code={bug.code_snippet} language={bug.language} />
      </div>
      
      {/* Solutions */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">💡 Solutions ({bug.Solutions?.length || 0})</h2>
        
        {bug.Solutions && bug.Solutions.length > 0 ? (
          bug.Solutions.sort((a, b) => b.score - a.score).map((sol) => (
            <div key={sol.id} className="bg-gray-700 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <strong>{sol.User?.username}</strong>
                  <span className="text-gray-400 text-sm ml-2">
                    Score: {sol.score}
                  </span>
                </div>
                <VoteButton solutionId={sol.id} initialScore={sol.score} />
              </div>
              
              {sol.explanation && (
                <p className="text-gray-300 mb-3">{sol.explanation}</p>
              )}
              
              <h4 className="font-semibold mb-1">Fixed code:</h4>
              <CodeViewer code={sol.code_fix} language={bug.language} />
              
              {sol.diff_text && (
                <>
                  <h4 className="font-semibold mt-3 mb-1">Changes made:</h4>
                  <DiffViewer diffText={sol.diff_text} />
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No solutions yet. Be the first to help!</p>
        )}
        
        {/* Submit Solution Form */}
        <div className="mt-8 border-t border-gray-700 pt-6">
          <h3 className="text-xl font-semibold mb-4">Submit a Solution</h3>
          <form onSubmit={submitSolution} className="space-y-4">
            <textarea
              placeholder="Explain your solution..."
              className="w-full p-2 bg-gray-800 rounded h-24"
              value={solution.explanation}
              onChange={(e) => setSolution({...solution, explanation: e.target.value})}
            />
            <textarea
              placeholder="Paste the fixed code here..."
              className="w-full p-2 bg-gray-800 rounded font-mono h-64"
              value={solution.code_fix}
              onChange={(e) => setSolution({...solution, code_fix: e.target.value})}
              required
            />
            <button type="submit" className="bg-green-600 px-6 py-2 rounded hover:bg-green-700">
              Submit Solution
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BugDetail;