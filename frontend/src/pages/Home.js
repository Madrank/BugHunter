import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api';

function Home() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchBugs();
  }, []);
  
  const fetchBugs = async () => {
    try {
      const response = await axios.get(`${API_URL}/bugs`);
      setBugs(response.data);
    } catch (error) {
      console.error('Error fetching bugs:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return <div className="text-center">Loading...</div>;
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🐛 Open Bugs</h2>
      <div className="grid gap-4">
        {bugs.map(bug => (
          <Link key={bug.id} to={`/bug/${bug.id}`}>
            <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">
              <h3 className="text-xl font-semibold">{bug.title}</h3>
              <p className="text-gray-400 mt-2">{bug.description.substring(0, 150)}...</p>
              <div className="mt-2 flex gap-2">
                <span className="bg-blue-600 px-2 py-1 rounded text-sm">{bug.language}</span>
                <span className="text-gray-500 text-sm">By {bug.User?.username}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;